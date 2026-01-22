const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');

exports.initiatePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user.userId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (booking.status !== 'PENDING') {
      return res.status(400).json({ message: 'Booking is not payable' });
    }

    const payment = new Payment({
      booking: booking._id,
      user: userId,
      amount: booking.priceSnapshot.totalPrice
    });

    await payment.save();

    res.status(201).json({
      message: 'Payment initiated',
      paymentId: payment._id,
      amount: payment.amount
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.markPaymentSuccess = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id).populate('booking');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.status === 'SUCCESS') {
      return res.status(400).json({ message: 'Payment already processed' });
    }

    payment.status = 'SUCCESS';
    payment.providerPaymentId = `MOCK_${Date.now()}`;
    await payment.save();

    payment.booking.status = 'CONFIRMED';
    await payment.booking.save();

    res.status(200).json({
      message: 'Payment successful, booking confirmed'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
