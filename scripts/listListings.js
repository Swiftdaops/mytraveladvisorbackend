require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../src/models/Listing');

async function listListings() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    const items = await Listing.find().lean();
    if (!items || items.length === 0) {
      console.log('No listings found');
      process.exit(0);
    }

    console.log(`Found ${items.length} listing(s):`);
    items.forEach((it) => {
      console.log('---------------------------');
      console.log(`id: ${it._id}`);
      console.log(`title: ${it.title}`);
      if (it.accommodationEstimate) {
        console.log('accommodationEstimate:', JSON.stringify(it.accommodationEstimate, null, 2));
      }
      if (it.price != null) console.log(`price: ${it.price}`);
      if (it.images && it.images.length) console.log('images:', it.images.map(i => i.url).join(', '));
      if (it.description) console.log('description:', it.description);
      console.log('meta:', it.meta || {});
    });

    process.exit(0);
  } catch (err) {
    console.error('Error listing listings:', err.message || err);
    process.exit(1);
  }
}

listListings();
