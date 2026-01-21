const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER'],
      required: true
    },

    dob: {
        type: Date,
        required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: false,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ['CUSTOMER', 'ADMIN'],
      default: 'CUSTOMER'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
