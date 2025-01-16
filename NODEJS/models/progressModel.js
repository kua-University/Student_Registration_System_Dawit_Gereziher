const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    default: '',
  },
  dateRecorded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Progress', progressSchema);
