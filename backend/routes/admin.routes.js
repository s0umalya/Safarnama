const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { createTripPackage, getAllBookings  } = require('../controllers/admin.controller');

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

module.exports = router;
