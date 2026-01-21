const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { createTripPackage } = require('../controllers/admin.controller');

router.post(
  '/create-packages',
  authenticate,
  authorizeRoles('ADMIN'),
  createTripPackage
);

module.exports = router;
