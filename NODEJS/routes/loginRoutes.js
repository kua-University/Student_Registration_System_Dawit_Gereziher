const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

// User login route
router.post('/', loginUser);

module.exports = router;
