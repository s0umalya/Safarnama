const TripPackage = require('../models/tripPackage.model');

exports.createTripPackage = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      meetingPoints,
      duration,
      basePricePerPerson,
      tags,
      cardImage,
      bannerImage,
      galleryImages,
      inclusions,
      itinerary
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !meetingPoints ||
      !duration ||
      !duration.days ||
      basePricePerPerson === undefined ||
      !tags ||
      tags.length === 0 ||
      !cardImage ||
      !bannerImage ||
      !itinerary ||
      itinerary.length === 0
    ) {
      return res.status(400).json({
        message: 'Required fields are missing'
      });
    }

    const tripPackage = new TripPackage({
      title,
      description,
      category,
      meetingPoints,
      duration,
      basePricePerPerson,
      tags,
      cardImage,
      bannerImage,
      galleryImages,
      inclusions,
      itinerary
    });


    await tripPackage.save();


    res.status(201).json({
      message: 'Trip package created successfully',
      tripPackageId: tripPackage._id
    });

  } catch (error) {
    console.error('Create Trip Package Error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

exports.updateTripPackage = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTrip = await TripPackage.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTrip) {
      return res.status(404).json({
        message: 'Trip package not found'
      });
    }

    res.status(200).json({
      message: 'Trip package updated successfully',
      tripPackage: updatedTrip
    });

  } catch (error) {
    console.error('Update Trip Package Error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

exports.updateTripPackageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        message: 'isActive must be a boolean'
      });
    }

    const tripPackage = await TripPackage.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!tripPackage) {
      return res.status(404).json({
        message: 'Trip package not found'
      });
    }

    res.status(200).json({
      message: `Trip package ${isActive ? 'enabled' : 'disabled'} successfully`,
      tripPackage
    });

  } catch (error) {
    console.error('Update Status Error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};


