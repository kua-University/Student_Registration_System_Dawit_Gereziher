const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
}, 
{
  timestamps: true, // Automatically adds `createdAt` and `updatedAt`
});

module.exports = mongoose.model('Payment', paymentSchema);
