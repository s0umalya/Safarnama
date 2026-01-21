const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { createBooking } = require('../controllers/booking.controller');

// For CUSTOMER
router.post('/', authenticate, createBooking);

module.exports = router;
