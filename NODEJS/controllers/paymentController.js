const Stripe = require('stripe');
const jwt = require('jsonwebtoken');
const Payment = require('../models/paymentModel');
require('dotenv').config();

// Initialize Stripe with your secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a new payment
const createPayment = async (req, res) => {
  const {  amount, paymentMethod } = req.body;
authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
 if (!token) {
   return res.status(401).json({ error: 'Access Denied: No Token Provided' });
  }

  try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode JWT to get user info
    userId = decoded.userId;
  if (!userId) {
     return res.status(400).json({ error: 'User ID is required for payment' });
   }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency: 'usd', // Replace 'usd' with your preferred currency
      payment_method_types: [paymentMethod || 'card'], // Default to 'card'
    });

    // Save the payment details in your database
    const newPayment = new Payment({
      userId,
      amount,
      paymentMethod: paymentIntent.payment_method || 'card',
      status: 'pending', // Initial status is 'Pending'
    });

    await newPayment.save();

    // Respond with the client secret for frontend to confirm the payment
    res.status(201).json({
      paymentId: newPayment._id,
      clientSecret: paymentIntent.client_secret,
      message: 'Payment initiated successfully',
    });

  } catch (error) {
    console.error('Error during payment creation:', error);
  
    res.status(400).json({ error: 'Payment creation failed', details: error.message });
 }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('userId courseId');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payments', details: error.message });
  }
};

// Get a payment by ID
const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id).populate('userId courseId');
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payment', details: error.message });
  }
};

// Update a payment by ID
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Only extract the status field from the request body

  // Validate the status value
  if (!['pending', 'completed', 'failed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    // Find the payment by ID and update only the status field
    const payment = await Payment.findByIdAndUpdate(
      id, 
      { status }, // Update only the status field
      { new: true } // Return the updated payment document
    );

    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    
    res.status(200).json(payment); // Send the updated payment object as response
  } catch (error) {
    res.status(400).json({ error: 'Payment update failed', details: error.message });
  }
};


// Delete a payment by ID
const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Payment deletion failed', details: error.message });
  }
};

// Export all controller functions
module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};