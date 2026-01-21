exports.createTripPackage = (req, res) => {
  res.status(201).json({
    message: 'Trip package created (admin only)'
  });
};
