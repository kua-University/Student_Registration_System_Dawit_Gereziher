const Schedule = require('../models/scheduleModel'); // Import the Schedule model

// Create a new schedule
const createSchedule = async (req, res) => {
  const { courseId, startTime, endTime, location } = req.body;

  try {
    const newSchedule = new Schedule({ courseId, startTime, endTime, location });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({ error: 'Schedule creation failed', details: error.message });
  }
};

// Get all schedules
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('courseId'); // Populate courseId for details
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve schedules', details: error.message });
  }
};

// Get a schedule by ID
const getScheduleById = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await Schedule.findById(id).populate('courseId');
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve schedule', details: error.message });
  }
};

// Update a schedule by ID
const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const schedule = await Schedule.findByIdAndUpdate(id, updateData, { new: true });
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ error: 'Schedule update failed', details: error.message });
  }
};

// Delete a schedule by ID
const deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await Schedule.findByIdAndDelete(id);
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Schedule deletion failed', details: error.message });
  }
};

// Export all controller functions
module.exports = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
