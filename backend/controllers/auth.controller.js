const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      dob,
      email,
      phone,
      password
    } = req.body;

    // 1. Basic validation
    if (!firstName || !lastName || !email || !password || !dob || !gender) {
      return res.status(400).json({
        message: 'Required fields are missing'
      });
    }

    // 2. Normalize email
    const normalizedEmail = email.toLowerCase();

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        message: 'Email already registered'
      });
    }

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create user
    const user = new User({
      firstName,
      lastName,
      gender,
      dob,
      email: normalizedEmail,
      phone,
      password: hashedPassword
    });

    await user.save();

    // 6. Response
    res.status(201).json({
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    // 2. Normalize email
    const normalizedEmail = email.toLowerCase();

    // 3. Find user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // 4. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // 5. Create JWT payload
    const payload = {
      userId: user._id,
      role: user.role
    };

    // 6. Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // 7. Send response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};



