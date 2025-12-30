const Trip = require('../models/Trip');

exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ active: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: trips, message: 'Trips fetched' });
  } catch (err) {
    next(err);
  }
};

exports.createTrip = async (req, res, next) => {
  try {
    const created = await Trip.create(req.body);
    res.status(201).json({ success: true, data: created, message: 'Trip created' });
  } catch (err) {
    next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    const updated = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, data: null, message: 'Trip not found' });
    res.json({ success: true, data: updated, message: 'Trip updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const deleted = await Trip.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, data: null, message: 'Trip not found' });
    res.json({ success: true, data: null, message: 'Trip deleted' });
  } catch (err) {
    next(err);
  }
};
