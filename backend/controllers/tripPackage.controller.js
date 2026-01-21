const TripPackage = require('../models/tripPackage.model');

exports.createTripPackage = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
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
