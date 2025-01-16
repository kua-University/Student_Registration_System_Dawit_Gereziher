const Notification = require('../models/notificationModel');

// Create a new notification
const createNotification = async (req, res) => {
  const { userId, message, status } = req.body;

  try {
    const newNotification = new Notification({ userId, message, status });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ error: 'Notification creation failed', details: error.message });
  }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate('userId');
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notifications', details: error.message });
  }
};

// Get a notification by ID
const getNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id).populate('userId');
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notification', details: error.message });
  }
};

// Update a notification by ID
const updateNotification = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const notification = await Notification.findByIdAndUpdate(id, updateData, { new: true });
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ error: 'Notification update failed', details: error.message });
  }
};

// Delete a notification by ID
const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Notification deletion failed', details: error.message });
  }
};

// Export all controller functions
module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};