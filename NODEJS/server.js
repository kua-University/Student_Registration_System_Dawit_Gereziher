const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database'); 
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const progressRoutes = require('./routes/progressRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const reportRoutes = require('./routes/reportRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const loginRoutes = require('./routes/loginRoutes');
const { authMiddleware } = require('./middlewares/authentication');

const app = express();

app.use(cors());
app.use(express.json());

// Route definitions
app.use('/api/login', loginRoutes);
app.use('/api/verifyToken', authMiddleware());
app.use('/api/courses', authMiddleware(['student', 'admin']), courseRoutes);
app.use('/api/users', authMiddleware(['student', 'admin']), userRoutes);
app.use('/api/registrations', authMiddleware(['admin']), registrationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/progress', authMiddleware(['student', 'admin']), progressRoutes);
app.use('/api/reports', authMiddleware(['student', 'admin']), reportRoutes);
app.use('/api/notifications', authMiddleware(['student', 'admin']), notificationRoutes);
app.use('/api/schedules', authMiddleware(['student', 'admin']), scheduleRoutes);

// Function to start the server
const startServer = async () => {
  try {
    // Wait for the database to connect
    await connectDB();

    // Start the server only after the database connection is successful
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database. Server not started.', error);
    process.exit(1); // Exit the process with failure
  }
};

// Start the server
startServer();

module.exports = app; // Export app for testing purposes
