import apiRequest from "../lib/apiRequest";

/**
 * Test all payment endpoints and log their responses
 * Use this in browser console to verify API responses
 */
export const testPaymentEndpoints = async () => {
  console.log("🔍 Testing Payment Endpoints...\n");

  try {
    // Test 1: Total Payments
    console.log("📊 Test 1: GET /payment/total");
    const totalRes = await apiRequest.get("/payment/total");
    console.log("   Raw Response:", totalRes);
    console.log("   Response Data:", totalRes.data);
    console.log("   Data Type:", typeof totalRes.data);
    console.log("   Is Number?:", typeof totalRes.data === 'number');
    console.log("   Is Object?:", typeof totalRes.data === 'object' && totalRes.data !== null);
    console.log("");

    // Test 2: Payment Stats
    console.log("📊 Test 2: GET /payment/stats");
    const statsRes = await apiRequest.get("/payment/stats");
    console.log("   Raw Response:", statsRes);
    console.log("   Response Data:", statsRes.data);
    console.log("   Data Type:", typeof statsRes.data);
    console.log("   Data Keys:", Object.keys(statsRes.data || {}));
    console.log("");

    // Test 3: Monthly Stats
    console.log("📊 Test 3: GET /payment/monthly-stats");
    const monthlyRes = await apiRequest.get("/payment/monthly-stats");
    console.log("   Raw Response:", monthlyRes);
    console.log("   Response Data:", monthlyRes.data);
    console.log("   Data Type:", typeof monthlyRes.data);
    console.log("   Data Keys:", Object.keys(monthlyRes.data || {}));
    console.log("");

    console.log("✅ All endpoints tested successfully!");

  } catch (error) {
    console.error("❌ Error testing endpoints:", error);
    console.error("   Status:", error.response?.status);
    console.error("   Message:", error.message);
  }
};

/**
 * Alternative: Call this function in the browser console to test
 * Example: import { testPaymentEndpoints } from './testPaymentAPI.js'
 * Then: testPaymentEndpoints()
 */
export default testPaymentEndpoints;
