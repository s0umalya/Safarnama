const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    // REFERENCES
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    tripPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TripPackage',
      required: true
    },
    // TRIP SNAPSHOT
    tripSnapshot: {
      title: String,
      category: String,
      duration: {
        days: Number,
        nights: Number
      }
    },
    // TRAVEL DETAILS
    travelDate: {
      type: Date,
      required: true
    },

    numberOfPeople: {
      type: Number,
      required: true,
      min: 1
    },
    // MEETING POINT SNAPSHOT
    meetingPoint: {
      code: String,
      label: String,
      address: String
    },
    // CONTACT DETAILS (1 per booking)
    contactDetails: {
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      }
    },
    // TRAVELERS
    travelers: [
      {
        firstName: {
          type: String,
          required: true
        },
        middleName: {
          type: String
        },
        lastName: {
          type: String,
          required: true
        },
        gender: {
          type: String,
          enum: ['MALE', 'FEMALE', 'OTHER'],
          required: true
        },
        dob: {
          type: Date,
          required: true
        }
      }
    ],
    // PRICE SNAPSHOT
    priceSnapshot: {
      basePricePerPerson: Number,
      totalPrice: Number
    },
    // BOOKING STATUS
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
      default: 'PENDING'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
