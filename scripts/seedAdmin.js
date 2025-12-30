require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');

const seedAdmin = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGO_URI not set');

    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding...');

    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env');
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists. Skipping seed.');
      process.exit(0);
    }

    await Admin.create({
      name: process.env.SEED_ADMIN_NAME || 'Primary Advisor',
      email,
      password,
      role: process.env.SEED_ADMIN_ROLE || 'superadmin',
    });

    console.log('------------------------------------------');
    console.log('✅ Admin seeded successfully!');
    console.log(`User: ${email}`);
    console.log('------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();
