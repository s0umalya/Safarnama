const Booking = require('../models/booking.model');

exports.createTripPackage = (req, res) => {
  res.status(201).json({
    message: 'Trip package created (admin only)'
  });
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate('user', 'firstName lastName email')
      .select(
        'tripSnapshot travelDate numberOfPeople priceSnapshot status createdAt user'
      );

    res.status(200).json(bookings);

  } catch (error) {
    console.error('Admin Get Bookings Error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};