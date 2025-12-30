require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');

async function updatePassword() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGO_URI or MONGODB_URI not set in .env');
    process.exit(1);
  }

  const newPassword = process.argv[2];
  const identifier = process.argv[3] || 'mytraveladvisorlite@gmail.com';

  if (!newPassword) {
    console.error('Usage: node scripts/updateAdminPassword.js newPassword [emailOrId]');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);

    const isId = /^[0-9a-fA-F]{24}$/.test(identifier);
    let admin;
    if (isId) admin = await Admin.findById(identifier);
    else admin = await Admin.findOne({ email: identifier });

    if (!admin) {
      console.error('Admin not found for:', identifier);
      process.exit(1);
    }

    admin.password = newPassword; // pre-save hook will hash
    await admin.save();

    console.log('✅ Admin password updated for:', admin.email);
    process.exit(0);
  } catch (err) {
    console.error('Error updating admin password:', err.message || err);
    process.exit(1);
  }
}

updatePassword();
