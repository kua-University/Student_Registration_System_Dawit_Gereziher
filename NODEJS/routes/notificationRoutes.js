const express = require('express');
const {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
  } = require('../controllers/notificationController');

const router = express.Router();

// Notification routes
router.post('/', createNotification);
router.get('/', getAllNotifications);
router.get('/:id', getNotificationById);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);

module.exports = router;