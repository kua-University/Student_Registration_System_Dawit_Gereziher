const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', 
    required: true,
  },
  attendance: {
    type: Number, 
    required: true,
  },
  grades: {
    type: [String], 
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', reportSchema);
