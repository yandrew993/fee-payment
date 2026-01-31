# API Request Debugging Guide

## How to Check API Responses

### Method 1: Browser DevTools (Recommended)
1. Open your admin dashboard in the browser
2. Press **F12** to open DevTools
3. Go to the **Network** tab
4. Look for these requests:
   - `GET /api/payment/total`
   - `GET /api/payment/stats`
   - `GET /api/payment/monthly-stats`

5. Click each request and check the **Response** tab
6. Note the response format and data type

### Method 2: Browser Console
1. Open DevTools (F12)
2. Go to the **Console** tab
3. You should see debug logs:
   ```
   Featured - totalData: (value) Type: (type)
   Featured - statsData: (value)
   Featured - totalError: (error)
   Chart - data: (value) Type: (type)
   Chart - error: (error)
   ```

### Expected API Responses

#### `/api/payment/total`
**Expected Response Type**: Number
```
5000
```
OR wrapped in object:
```json
{ "total": 5000 }
```

#### `/api/payment/stats`
**Expected Response Type**: Object
```json
{
  "totalAmount": 5000,
  "newAmount": 2000,
  "percentChange": 50,
  "weeklyAmount": 500,
  "weeklyChange": 25
}
```

#### `/api/payment/monthly-stats`
**Expected Response Type**: Object with month keys
```json
{
  "1": 1000,
  "2": 1500,
  "3": 2000,
  "4": 1800,
  "5": 2200,
  "6": 1900,
  "7": 0,
  "8": 0,
  "9": 0,
  "10": 0,
  "11": 0,
  "12": 0
}
```

## Common Issues and Fixes

### Issue 1: Response Wrapped in `data` property
**Problem**: API returns `{ "data": 5000 }` instead of just `5000`

**Solution**: Update the backend controller:
```javascript
// WRONG
res.json({ data: total._sum.amount || 0 });

// CORRECT
res.json(total._sum.amount || 0);
```

### Issue 2: Response Wrapped in `success` or `message` properties
**Problem**: API returns `{ "success": true, "data": {...} }`

**Solution**: Unwrap the response in the backend OR update useFetch to handle it:
```javascript
// Backend
res.json(statsObject); // Send object directly

// OR Frontend (useFetch.js)
const actualData = res.data.data || res.data;
setData(actualData);
```

### Issue 3: useFetch Not Detecting Single Items
**Problem**: `useFetch` wraps single objects in an array

**Solution**: Make sure you're passing `true` as second parameter:
```javascript
// WRONG
useFetch("/payment/total");

// CORRECT
useFetch("/payment/total", true);
```

## Step-by-Step Debugging

1. **Check Backend Response Format**
   - Open Network tab
   - Make a payment or wait for component to load
   - Check the exact response format

2. **Check Frontend Receiving Data**
   - Look at Console logs for data and type
   - Verify the data matches expected format

3. **Check Component Usage**
   - Verify `useFetch` is called with `true` parameter
   - Verify components access data correctly

4. **Fix Accordingly**
   - If API returns wrapped data, update backend OR update useFetch
   - If useFetch returns wrong format, check isSingleItem parameter

## Quick Test Script

You can run this in the browser console to test API calls:

```javascript
// Test totalPayments endpoint
fetch('http://localhost:3000/api/payment/total', {credentials: 'include'})
  .then(r => r.json())
  .then(d => console.log('Total Response:', d, 'Type:', typeof d));

// Test stats endpoint
fetch('http://localhost:3000/api/payment/stats', {credentials: 'include'})
  .then(r => r.json())
  .then(d => console.log('Stats Response:', d, 'Type:', typeof d));

// Test monthly stats endpoint
fetch('http://localhost:3000/api/payment/monthly-stats', {credentials: 'include'})
  .then(r => r.json())
  .then(d => console.log('Monthly Response:', d, 'Type:', typeof d));
```

Run these in the browser console (F12 → Console) while the backend is running to see the exact response format.
