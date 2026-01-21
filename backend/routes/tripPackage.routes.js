const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { createTripPackage } = require('../controllers/tripPackage.controller');


router.post(
  '/',
  authenticate,
  authorizeRoles('ADMIN'),
  createTripPackage
);

module.exports = router;
