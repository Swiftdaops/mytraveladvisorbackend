const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  // Accommodation estimate (per day) for this listing / country
  accommodationEstimate: {
    minPerDay: { type: Number },
    maxPerDay: { type: Number },
  },
  images: [{ url: String, public_id: String }],
  meta: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model('Listing', ListingSchema);

// No average calculation: we store min/max range for accommodation per day
