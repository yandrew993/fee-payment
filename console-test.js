/**
 * Backend Connectivity Tester
 * Paste this in browser console to test backend connectivity
 */

(async function testBackends() {
  console.clear();
  console.log('%c🧪 Backend Connectivity Test', 'font-size: 16px; font-weight: bold; color: #0066cc;');
  console.log('Testing if frontend can reach backend APIs...\n');

  const backends = [
    {
      name: 'Express API (Local)',
      url: 'http://localhost:3000/api/health',
      type: 'express'
    },
    {
      name: 'PHP API (Production)',
      url: 'https://surewaygroupofschools.org/api/health',
      type: 'php'
    },
    {
      name: 'Current Config',
      url: (process.env.REACT_APP_API_URL || 'https://surewaygroupofschools.org/api') + '/health',
      type: 'current'
    }
  ];

  let results = [];

  for (const backend of backends) {
    try {
      console.log(`📍 Testing: ${backend.name}`);
      console.log(`   URL: ${backend.url}`);
      
      const response = await fetch(backend.url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log(`%c✅ Connected! (Status: ${response.status})`, 'color: green; font-weight: bold;');
        console.log(`   Response:`, data);
        results.push({ ...backend, success: true, status: response.status });
      } else {
        console.log(`%c⚠️  Status Error (${response.status})`, 'color: orange;');
        results.push({ ...backend, success: false, status: response.status });
      }
    } catch (error) {
      let errorType = error.message;
      if (error.message.includes('Failed to fetch')) {
        errorType = 'CORS or Network Error';
      }
      
      console.log(`%c❌ Connection Failed: ${errorType}`, 'color: red;');
      results.push({ ...backend, success: false, error: error.message });
    }
    
    console.log('');
  }

  // Summary
  console.log('%c' + '='.repeat(60), 'font-size: 12px;');
  console.log('%c📊 Summary', 'font-size: 14px; font-weight: bold;');
  console.log('%c' + '='.repeat(60), 'font-size: 12px;');

  let successCount = 0;
  results.forEach(result => {
    const emoji = result.success ? '✅' : '❌';
    const color = result.success ? 'green' : 'red';
    console.log(`%c${emoji} ${result.name}`, `color: ${color};`);
    if (!result.success) {
      console.log(`   Error: ${result.error || 'Unknown error'}`);
    }
    if (result.success) successCount++;
  });

  console.log('%c' + '='.repeat(60), 'font-size: 12px;');
  console.log(`%c✅ Working: ${successCount}/${results.length}`, 'font-size: 12px; font-weight: bold;');

  // Recommendations
  console.log('\n%c💡 Recommendations:', 'font-size: 12px; font-weight: bold; color: #0066cc;');
  
  if (successCount === 0) {
    console.log('%c⚠️  No backends are reachable!', 'color: red;');
    console.log('Troubleshooting steps:');
    console.log('1. Express API: Start with "npm start" in api folder');
    console.log('2. PHP API: Check if deployed at https://surewaygroupofschools.org/api');
    console.log('3. Network: Check firewall and internet connection');
    console.log('4. CORS: Check browser console for CORS errors');
  } else {
    console.log('%c✅ At least one backend is reachable!', 'color: green;');
    
    const currentEnv = results.find(r => r.type === 'current');
    if (currentEnv && currentEnv.success) {
      console.log(`Current config (${currentEnv.name}) is working correctly!`);
    }
  }

  // API environment info
  console.log('\n%c🔧 Current Configuration:', 'font-size: 12px; font-weight: bold; color: #0066cc;');
  console.log(`REACT_APP_API_URL: ${process.env.REACT_APP_API_URL || 'Not set (using fallback)'}`);
  console.log(`Using: ${process.env.REACT_APP_API_URL || 'https://surewaygroupofschools.org/api'}`);

  console.log('\n%c' + '='.repeat(60), 'font-size: 12px;');
})();
