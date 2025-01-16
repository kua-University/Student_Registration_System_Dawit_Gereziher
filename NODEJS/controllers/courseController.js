const Course = require('../models/courseModel');

// Create a new course
const createCourse = async (req, res) => {
  const { title, description, credits, instructor, price, duration } = req.body;

  try {
    const newCourse = new Course({ title, description, credits, instructor, price, duration });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: 'Course creation failed', details: error.message });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve courses', details: error.message });
  }
};

// Get a course by ID
const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve course', details: error.message });
  }
};

// Update a course by ID
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const course = await Course.findByIdAndUpdate(id, updateData, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: 'Course update failed', details: error.message });
  }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Course deletion failed', details: error.message });
  }
};

// Export all controller functions
module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};