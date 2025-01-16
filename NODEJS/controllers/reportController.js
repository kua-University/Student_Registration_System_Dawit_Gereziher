const Report = require('../models/reportModel');

// Create a new report
const createReport = async (req, res) => {
  const { userId, courseId, attendance, grades } = req.body;

  try {
    const newReport = new Report({ userId, courseId, attendance, grades });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ error: 'Report creation failed', details: error.message });
  }
};

// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('userId courseId');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reports', details: error.message });
  }
};

// Get a report by ID
const getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findById(id).populate('userId courseId');
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve report', details: error.message });
  }
};

// Update a report by ID
const updateReport = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const report = await Report.findByIdAndUpdate(id, updateData, { new: true });
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: 'Report update failed', details: error.message });
  }
};

// Delete a report by ID
const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findByIdAndDelete(id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Report deletion failed', details: error.message });
  }
};

// Export all controller functions
module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
};