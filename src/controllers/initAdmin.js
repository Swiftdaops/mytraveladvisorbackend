const Admin = require('../models/Admin');

// Handy script to create an initial admin if none exists.
module.exports = async function ensureAdmin() {
  const count = await Admin.countDocuments();
  if (count === 0) {
    const admin = new Admin({ email: 'admin@example.com', password: 'password123' });
    await admin.save();
    console.log('Created default admin: admin@example.com / password123');
  }
};
