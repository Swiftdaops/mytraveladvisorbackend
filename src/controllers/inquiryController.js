const Inquiry = require('../models/Inquiry');
const Client = require('../models/Client');

exports.createInquiry = async (req, res, next) => {
  try {
    const payload = req.body;

    // Upsert client by email (primary key)
    let client = null;
    if (payload?.email) {
      client = await Client.findOne({ email: payload.email });
      if (!client) {
        client = await Client.create({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          transportation: payload.transportation,
          tripType: payload.tripType,
          travelers: payload.travelers,
          accommodation: payload.accommodation,
          travelersInfo: payload.travelersInfo,
          activities: payload.activities,
          activitiesOther: payload.activitiesOther,
          destination: payload.destination,
          travelDates: payload.travelDates,
          budget: payload.budget,
          status: payload.status,
        });
      } else {
        // update last-known details (do not overwrite with undefined)
        const set = {};
        for (const key of [
          'name',
          'phone',
          'transportation',
          'tripType',
          'travelers',
          'accommodation',
          'travelersInfo',
          'activities',
          'activitiesOther',
          'destination',
          'travelDates',
          'budget',
          'status',
        ]) {
          if (payload[key] !== undefined) set[key] = payload[key];
        }
        if (Object.keys(set).length) {
          client = await Client.findByIdAndUpdate(client._id, set, { new: true, runValidators: true });
        }
      }
    }

    const created = await Inquiry.create({
      ...payload,
      client: client?._id,
    });
    res.status(201).json({ success: true, data: created, message: 'Inquiry submitted' });
  } catch (err) {
    next(err);
  }
};

exports.getInquiries = async (req, res, next) => {
  try {
    const items = await Inquiry.find().populate('client').sort({ createdAt: -1 });
    res.json({ success: true, data: items, message: 'Inquiries fetched' });
  } catch (err) {
    next(err);
  }
};

exports.updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, data: null, message: 'Inquiry not found' });
    res.json({ success: true, data: updated, message: 'Inquiry updated' });
  } catch (err) {
    next(err);
  }
};
