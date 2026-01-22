const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { createBooking, getMyBookings } = require('../controllers/booking.controller');

// For CUSTOMER
router.post('/', authenticate, createBooking);

router.get('/my-bookings', authenticate, getMyBookings);

module.exports = router;
