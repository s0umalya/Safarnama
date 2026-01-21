const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { createTripPackage, updateTripPackage } = require('../controllers/tripPackage.controller');


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


module.exports = router;
