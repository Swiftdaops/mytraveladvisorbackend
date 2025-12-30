const axios = require('axios');

// Configuration
const PORT = process.env.BACKEND_PORT || process.env.PORT || 4000;
const BASE_URL = `http://localhost:${PORT}/api`;
const ADMIN_CREDENTIALS = {
  email: 'mytraveladvisorlite@gmail.com',
  password: 'tobefavour'
};

const TRIP_DATA = {
  name: 'USA to Paris',
  dailyCost: 350,
  description: 'Luxury flight and hotel package for the ultimate Parisian getaway. Includes 5-star accommodation near the Eiffel Tower.',
  image: 'https://res.cloudinary.com/demo/image/upload/v1631234567/paris_hero.jpg', // Placeholder
  active: true
};

async function runApiTest() {
  console.log('🧪 Starting API Integration Test...');

  try {
    // 1. ADMIN LOGIN
    console.log('--- Step 1: Logging in Admin ---');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, ADMIN_CREDENTIALS);
    
    // Extract the httpOnly cookie from the response headers
    const cookie = loginRes.headers['set-cookie'];
    if (!cookie) {
      throw new Error('No cookie received. Check authController logic.');
    }
    console.log('✅ Login Successful. Cookie Captured.');

    // 2. CREATE TRIP (USA TO PARIS)
    console.log('\n--- Step 2: Creating "USA to Paris" Trip ---');
    const createRes = await axios.post(`${BASE_URL}/trips`, TRIP_DATA, {
      headers: { Cookie: cookie.join('; ') }, // Attach the admin session cookie
      withCredentials: true
    });

    if (createRes.data.success) {
      console.log('✅ Trip Created:', createRes.data.data.name);
    }

    // 3. FETCH ALL TRIPS (VERIFICATION)
    console.log('\n--- Step 3: Verifying Trip in Public Feed ---');
    const fetchRes = await axios.get(`${BASE_URL}/trips`);
    
    const parisTrip = fetchRes.data.data.find(t => t.name === 'USA to Paris');
    if (parisTrip) {
      console.log('✅ Verification Passed: Trip found in database.');
      console.log(`📍 Destination: ${parisTrip.name}`);
      console.log(`💰 Daily Cost: $${parisTrip.dailyCost}`);
    } else {
      console.log('❌ Verification Failed: Trip not found.');
    }

    console.log('\n🚀 All tests passed successfully!');

  } catch (error) {
    console.error('\n❌ Test Failed:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Message:', error.response.data.message || error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

runApiTest();