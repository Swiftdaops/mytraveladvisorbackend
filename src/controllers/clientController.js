const Client = require('../models/Client');

exports.listClients = async (req, res, next) => {
  try {
    const q = (req.query.q || '').toString().trim();
    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { email: { $regex: q, $options: 'i' } },
            { phone: { $regex: q, $options: 'i' } },
          ],
        }
      : {};

    const items = await Client.find(filter).sort({ updatedAt: -1 });
    res.json({ success: true, data: items, message: 'Clients fetched' });
  } catch (err) {
    next(err);
  }
};

exports.getClient = async (req, res, next) => {
  try {
    const item = await Client.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, data: null, message: 'Client not found' });
    res.json({ success: true, data: item, message: 'Client fetched' });
  } catch (err) {
    next(err);
  }
};
