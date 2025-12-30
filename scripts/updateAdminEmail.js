require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');

async function updateEmail() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGO_URI or MONGODB_URI not set in .env');
    process.exit(1);
  }

  const newEmail = process.argv[2];
  const oldIdentifier = process.argv[3] || 'admin@example.com';

  if (!newEmail) {
    console.error('Usage: node scripts/updateAdminEmail.js newEmail [oldEmailOrId]');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);

    // Try by id first if oldIdentifier looks like an ObjectId
    const isId = /^[0-9a-fA-F]{24}$/.test(oldIdentifier);
    let admin;
    if (isId) {
      admin = await Admin.findById(oldIdentifier);
    } else {
      admin = await Admin.findOne({ email: oldIdentifier });
    }

    if (!admin) {
      console.error('Admin not found for:', oldIdentifier);
      process.exit(1);
    }

    // Check if new email already exists
    const exists = await Admin.findOne({ email: newEmail });
    if (exists) {
      console.error('An admin with the new email already exists:', newEmail);
      process.exit(1);
    }

    admin.email = newEmail;
    await admin.save();

    console.log('✅ Admin email updated.');
    console.log(JSON.stringify({ id: admin._id, name: admin.name, email: admin.email, role: admin.role }, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error updating admin email:', err.message || err);
    process.exit(1);
  }
}

updateEmail();
