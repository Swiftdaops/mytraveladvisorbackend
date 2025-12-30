const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    dailyCost: { type: Number, required: true },
    image: { type: String }, // Cloudinary URL
    description: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', TripSchema);
