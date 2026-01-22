const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { createTripPackage, getAllBookings  } = require('../controllers/admin.controller');
const { confirmBooking, cancelBooking } = require('../controllers/booking.controller')

router.post(
  '/create-packages',
  authenticate,
  authorizeRoles('ADMIN'),
  createTripPackage
);

router.get(
  '/bookings',
  authenticate,
  authorizeRoles('ADMIN'),
  getAllBookings
);

router.patch(
  '/:id/confirm',
  authenticate,
  authorizeRoles('ADMIN'),
  confirmBooking
);
//For both ADMIN & CUSTOMER
router.patch(
  '/:id/cancel',
  authenticate,
  cancelBooking
);

module.exports = router;
