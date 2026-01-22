const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { initiatePayment, markPaymentSuccess } = require('../controllers/payment.controller');

router.post('/initiate', authenticate, initiatePayment);
router.patch('/:id/success', authenticate, markPaymentSuccess);

module.exports = router;
