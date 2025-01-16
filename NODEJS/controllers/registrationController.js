const Registration = require('../models/registrationModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');


// Register a user for a course
const registerUserForCourse = async (req, res) => {
  const { courseId, paymentId } = req.body;
  authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: 'Access Denied: No Token Provided' });
   }
  try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode JWT to get user info
    userId = decoded.userId;
    const newRegistration = new Registration({ userId, courseId, paymentId });
    await newRegistration.save();
    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(400).json({ error: 'Registration failed', details: error.message });
  }
};

// Get all registrations
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().populate('userId courseId paymentId');
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve registrations', details: error.message });
  }
};

// Get a registration by ID
const getRegistrationById = async (req, res) => {
  const { id } = req.params;

  try {
    const registration = await Registration.findById(id).populate('userId courseId');
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve registration', details: error.message });
  }
};

// Update a registration by ID
const updateRegistration = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const registration = await Registration.findByIdAndUpdate(id, updateData, { new: true });
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.status(200).json(registration);
  } catch (error) {
    res.status(400).json({ error: 'Registration update failed', details: error.message });
  }
};

// Delete a registration by ID
const deleteRegistration = async (req, res) => {
  const { id } = req.params;

  try {
    const registration = await Registration.findByIdAndDelete(id);
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.status(200).json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration deletion failed', details: error.message });
  }
};

// Export all controller functions
module.exports = {
  registerUserForCourse,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
};