const mongoose = require('mongoose')

const tripPackageSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['CLASSIC', 'THRILL', 'SPECIAL'],
            required: true
        },
        //MEETING POINTS
        meetingPoints: [
            {
                code: {
                    type: String,
                    required: true
                },
                label: {
                    type: String,
                    required: true
                },
                address: {
                    type: String
                }
            }
        ],
        //DURATION
        duration: {
            days: {
                type: Number,
                required: true,
                min: 1
            },
            nights: {
                type: Number,
                required: true,
                min: 0
            }
        },
        //BASE PRICING
        basePricePerPerson: {
            type: Number,
            required: true,
            min: 0
        },
        //SEARCH & FILTER SUPPORT
        tags: [
            {
                type: String,
                required: true,
                lowercase: true,
                trim: true
            }
        ],
        //MEDIA
        cardImage: {
            type: String,
            required: true
        },
        bannerImage: {
            type: String,
            required: true
        },

        galleryImages: [
            {
                type: String
            }
        ],
        //PACKAGE-LEVEL INCLUSIONS
        inclusions: {
            accommodation: { type: Boolean, default: false },
            transfer: { type: Boolean, default: false },
            meals: { type: Boolean, default: false },
            sightseeing: { type: Boolean, default: false }
        },
        //DAY-WISE ITINERARY
        itinerary: [
            {
                day: {
                    type: Number,
                    required: true
                },

                title: {
                    type: String,
                    required: true
                },

                distanceKm: {
                    type: Number
                },

                dayInclusions: {
                    arrivalTransfer: { type: Boolean, default: false },
                    breakfast: { type: Boolean, default: false },
                    lunch: { type: Boolean, default: false },
                    dinner: { type: Boolean, default: false },
                    hotelStay: { type: Boolean, default: false },
                    sightseeing: { type: Boolean, default: false }
                },

                activities: [
                    {
                        type: String,
                        required: true
                    }
                ]
            }
        ],
        //STATUS
        isActive: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('TripPackage', tripPackageSchema);