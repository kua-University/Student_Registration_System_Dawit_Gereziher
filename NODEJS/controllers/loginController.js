const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Directly compare the plain text password (since you are not using hashing)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // Send the token
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

module.exports = { loginUser };
