const Progress = require('../models/progressModel');

// Create a new progress record
const createProgressRecord = async (req, res) => {
  const { userId, courseId, progress } = req.body;

  try {
    const newProgress = new Progress({ userId, courseId, progress });
    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (error) {
    res.status(400).json({ error: 'Progress record creation failed', details: error.message });
  }
};

// Get all progress records
const getAllProgressRecords = async (req, res) => {
  try {
    const progressRecords = await Progress.find().populate('userId courseId');
    res.status(200).json(progressRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve progress records', details: error.message });
  }
};

// Get progress by ID
const getProgressById = async (req, res) => {
  const { id } = req.params;

  try {
    const progress = await Progress.findById(id).populate('userId courseId');
    if (!progress) return res.status(404).json({ error: 'Progress record not found' });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve progress record', details: error.message });
  }
};

// Update a progress record by ID
const updateProgressRecord = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const progress = await Progress.findByIdAndUpdate(id, updateData, { new: true });
    if (!progress) return res.status(404).json({ error: 'Progress record not found' });
    res.status(200).json(progress);
  } catch (error) {
    res.status(400).json({ error: 'Progress record update failed', details: error.message });
  }
};

// Delete a progress record by ID
const deleteProgressRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const progress = await Progress.findByIdAndDelete(id);
    if (!progress) return res.status(404).json({ error: 'Progress record not found' });
    res.status(200).json({ message: 'Progress record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Progress record deletion failed', details: error.message });
  }
};

// Export all controller functions
module.exports = {
  createProgressRecord,
  getAllProgressRecords,
  getProgressById,
  updateProgressRecord,
  deleteProgressRecord,
};