require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');

async function listAdmins() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGO_URI or MONGODB_URI not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    const admins = await Admin.find().select('-password').lean();
    if (!admins || admins.length === 0) {
      console.log('No admins found');
    } else {
      console.log('Admins:');
      admins.forEach((a) => console.log(JSON.stringify(a, null, 2)));
    }
    process.exit(0);
  } catch (err) {
    console.error('Error listing admins:', err.message || err);
    process.exit(1);
  }
}

listAdmins();
