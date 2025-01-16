const mongoose = require('mongoose');

const uri = "mongodb+srv://dawitgereziher5:v1NZzdkwqsvlIsU2@students.nthfm.mongodb.net/?retryWrites=true&w=majority&appName=Students";

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Successfully connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;