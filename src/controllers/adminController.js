const Listing = require('../models/Listing');
const Trip = require('../models/Trip');
const Inquiry = require('../models/Inquiry');
const Admin = require('../models/Admin');

exports.getDashboard = async (req, res) => {
  try {
    const [listingsCount, tripsCount, inquiriesCount, adminsCount] = await Promise.all([
      Listing.countDocuments(),
      Trip.countDocuments(),
      Inquiry.countDocuments(),
      Admin.countDocuments(),
    ]);

    return res.json({
      success: true,
      data: { listingsCount, tripsCount, inquiriesCount, adminsCount },
    });
  } catch (err) {
    console.error('Admin dashboard error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.listAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    return res.json({ success: true, data: admins });
  } catch (err) {
    console.error('List admins error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
