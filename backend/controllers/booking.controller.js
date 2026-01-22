const Booking = require('../models/booking.model');
const TripPackage = require('../models/tripPackage.model');

exports.createBooking = async (req, res) => {
  try {
    //Extract request body
    const {
      tripPackageId,
      travelDate,
      numberOfPeople,
      meetingPointCode,
      contactDetails,
      travelers
    } = req.body;
    //Basic Validation
    if (
      !tripPackageId ||
      !travelDate ||
      !numberOfPeople ||
      !meetingPointCode ||
      !contactDetails ||
      !travelers
    ) {
      return res.status(400).json({
        message: 'Required fields are missing'
      });
    }
    //Validate traveler count
    if (travelers.length !== numberOfPeople) {
      return res.status(400).json({
        message: 'Number of travelers must match number of people'
      });
    }
    //Fetch trip package (must be active)
    const tripPackage = await TripPackage.findOne({
      _id: tripPackageId,
      isActive: true
    });

    if (!tripPackage) {
      return res.status(404).json({
        message: 'Trip package not found or inactive'
      });
    }
    //Validate meeting point
    const selectedMeetingPoint = tripPackage.meetingPoints.find(
      mp => mp.code === meetingPointCode
    );

    if (!selectedMeetingPoint) {
      return res.status(400).json({
        message: 'Invalid meeting point selected'
      });
    }
    //Calculate price
    const basePrice = tripPackage.basePricePerPerson;
    const totalPrice = basePrice * numberOfPeople;

    //Create booking with snapshots
    const booking = new Booking({
      user: req.user.userId,
      tripPackage: tripPackage._id,

      tripSnapshot: {
        title: tripPackage.title,
        category: tripPackage.category,
        duration: tripPackage.duration
      },

      travelDate,
      numberOfPeople,

      meetingPoint: {
        code: selectedMeetingPoint.code,
        label: selectedMeetingPoint.label,
        address: selectedMeetingPoint.address
      },

      contactDetails,
      travelers,

      priceSnapshot: {
        basePricePerPerson: basePrice,
        totalPrice
      },

      status: 'PENDING'
    });

    //Save booking
    await booking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      bookingId: booking._id
    });

  } catch (error) {
    console.error('Create Booking Error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    // Logged-in user ID comes from auth middleware
    const userId = req.user.userId;

    // Fetch bookings for this user
    const bookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 })
      .select(
        'tripSnapshot travelDate numberOfPeople priceSnapshot status createdAt'
      );

    res.status(200).json(bookings);

  } catch (error) {
    console.error('Get My Bookings Error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'PENDING') {
      return res.status(400).json({
        message: `Booking cannot be confirmed from status ${booking.status}`
      });
    }

    booking.status = 'CONFIRMED';
    await booking.save();

    res.status(200).json({
      message: 'Booking confirmed successfully'
    });

  } catch (error) {
    console.error('Confirm Booking Error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};



