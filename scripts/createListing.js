require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../src/models/Listing');

async function createListing() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  const [,, title, minStr, maxStr, imageUrl] = process.argv;
  if (!title || !minStr || !maxStr) {
    console.error('Usage: node scripts/createListing.js "Country Name" minPerDay maxPerDay [imageUrl]');
    process.exit(1);
  }

  const minPerDay = Number(minStr);
  const maxPerDay = Number(maxStr);
  if (Number.isNaN(minPerDay) || Number.isNaN(maxPerDay)) {
    console.error('minPerDay and maxPerDay must be numbers');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    const listing = await Listing.create({
      title,
      accommodationEstimate: { minPerDay, maxPerDay },
      images: imageUrl ? [{ url: imageUrl }] : [],
      meta: { seededAt: new Date().toISOString() },
    });

    console.log('✅ Created listing:');
    console.log(JSON.stringify(listing, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error creating listing:', err.message || err);
    process.exit(1);
  }
}

createListing();
