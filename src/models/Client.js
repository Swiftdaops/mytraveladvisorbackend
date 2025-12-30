const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String },

    // Last known preferences/details from inquiry
    transportation: { type: String },
    tripType: { type: String },
    travelers: {
      adults: { type: Number, default: 1 },
      children: { type: Number, default: 0 },
      seniors: { type: Number, default: 0 },
    },
    accommodation: { type: String },
    travelersInfo: { type: String },
    activities: [{ type: String }],
    activitiesOther: { type: String },
    destination: { type: String },
    travelDates: {
      start: { type: Date },
      end: { type: Date },
    },
    budget: { type: String },

    status: {
      type: String,
      enum: ['New', 'Contacted', 'Booked', 'Archived'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', ClientSchema);
