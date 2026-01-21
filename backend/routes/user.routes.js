const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { getUserProfile } = require('../controllers/user.controller');

router.get('/profile', authenticate, getUserProfile);

module.exports = router;
