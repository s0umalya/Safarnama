const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { createBooking, getMyBookings, getBookingById } = require('../controllers/booking.controller');

// For CUSTOMER
router.post('/', authenticate, createBooking);

router.get('/my-bookings', authenticate, getMyBookings);

router.get(
  '/:id',
  authenticate,
  getBookingById
);

module.exports = router;
