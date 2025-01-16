const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
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
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment', 
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['registered', 'completed', 'dropped'],
    default: 'registered',
  },
});

module.exports = mongoose.model('Registration', registrationSchema);
