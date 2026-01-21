const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { createTripPackage, updateTripPackage, updateTripPackageStatus } = require('../controllers/tripPackage.controller');


router.post(
  '/',
  authenticate,
  authorizeRoles('ADMIN'),
  createTripPackage
);

router.patch(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  updateTripPackage
);

router.patch(
  '/:id/status',
  authenticate,
  authorizeRoles('ADMIN'),
  updateTripPackageStatus
);


module.exports = router;
