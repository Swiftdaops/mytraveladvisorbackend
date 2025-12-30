const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
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

module.exports = mongoose.model('Inquiry', InquirySchema);
