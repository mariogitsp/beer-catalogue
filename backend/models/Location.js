const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['brewery', 'bar', 'bottle_shop', 'restaurant', 'other'],
    default: 'other',
  },
  address: {
    street: String,
    city: String,
    postal_code: String,
    country: String,
  },
  coordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  phone: String,
  website: String,
  description: String,
  common_beers: [
    {
      beer_id: { type: mongoose.Schema.Types.String, ref: 'Beer' },
      beer_name: String,
      brewery_name: String,
      is_available: { type: Boolean, default: true },
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Geospatial index for nearby location queries
locationSchema.index({ coordinates: '2dsphere' });

locationSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Location', locationSchema);
