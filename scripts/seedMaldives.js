require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../src/models/Listing');

async function seed() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to DB');

    // Remove all existing listings
    const del = await Listing.deleteMany({});
    console.log(`Deleted ${del.deletedCount || 0} existing listings`);

    // Create Maldives listing
    const listing = await Listing.create({
      title: 'Maldives',
      description: 'Beautiful Maldives accommodation options',
      accommodationEstimate: { minPerDay: 50, maxPerDay: 500 },
      images: [{ url: 'https://res.cloudinary.com/dyfkq6nbd/image/upload/v1767093050/maldives_innhuv.avif' }],
      meta: { seeded: true },
    });

    console.log('Created listing:');
    console.log(JSON.stringify({ id: listing._id, title: listing.title, accommodationEstimate: listing.accommodationEstimate, images: listing.images }, null, 2));

    // Verify count
    const count = await Listing.countDocuments();
    console.log(`Total listings in DB: ${count}`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message || err);
    process.exit(1);
  }
}

seed();
