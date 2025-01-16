const express = require('express');
const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');
const registrationRoutes = require('./registrationRoutes');
const paymentRoutes = require('./paymentRoutes');
const progressRoutes = require('./progressRoutes');
const reportRoutes = require('./reportRoutes');
const notificationRoutes = require('./notificationRoutes');

const router = express.Router();

// Use routes
router.use('/api/users', userRoutes);
router.use('/api/courses', courseRoutes);
router.use('/api/registrations', registrationRoutes);
router.use('/api/payments', paymentRoutes);
router.use('/api/progress', progressRoutes);
router.use('/api/reports', reportRoutes);
router.use('/api/notifications', notificationRoutes);

module.exports = router;