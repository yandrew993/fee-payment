#!/usr/bin/env node

/**
 * Backend Connectivity Test
 * Tests if the frontend can reach the backend API
 */

const axios = require('axios');

// Test endpoints
const backends = [
  {
    name: 'Express API (Local)',
    url: 'http://localhost:3000/api',
  },
  {
    name: 'PHP API (Production)',
    url: 'https://surewaygroupofschools.org/api',
  },
  {
    name: 'PHP API (Health Check)',
    url: 'https://surewaygroupofschools.org/api/health',
  }
];

console.log('\n🧪 Backend Connectivity Test\n');
console.log('=' .repeat(60));

async function testBackend(backend) {
  try {
    console.log(`\n📍 Testing: ${backend.name}`);
    console.log(`   URL: ${backend.url}`);
    console.log('   Status: ', '');

    const response = await axios.get(backend.url, {
      timeout: 5000,
      validateStatus: () => true, // Accept all status codes
    });

    console.log(`✅ Connected! (Status: ${response.status})`);
    
    if (response.data) {
      console.log('   Response:', JSON.stringify(response.data).substring(0, 100) + '...');
    }
    
    return { success: true, status: response.status };
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Connection Refused - Backend not running');
    } else if (error.code === 'ENOTFOUND') {
      console.log('❌ DNS Error - Invalid hostname');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('❌ Timeout - Backend took too long to respond');
    } else {
      console.log(`❌ Error: ${error.message}`);
    }
    return { success: false, error: error.message };
  }
}

async function runTests() {
  const results = [];

  for (const backend of backends) {
    const result = await testBackend(backend);
    results.push({ ...backend, ...result });
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Summary:\n');

  let successCount = 0;
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.name}`);
    if (!result.success) {
      console.log(`   Error: ${result.error}`);
    }
    if (result.success) successCount++;
  });

  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Working: ${successCount}/${results.length}`);

  if (successCount === 0) {
    console.log('\n⚠️  No backends are reachable!');
    console.log('\nTroubleshooting:');
    console.log('1. Express API: Run "npm start" in the api folder');
    console.log('2. PHP API: Check if deployed at https://surewaygroupofschools.org/api');
    console.log('3. Network: Check internet connection and firewall');
  } else if (successCount === 1) {
    console.log('\n⚠️  Only one backend is available');
    console.log('   Make sure both backends are accessible for full testing');
  } else {
    console.log('\n✅ All backends are reachable!');
  }

  console.log('\n');
}

runTests();
