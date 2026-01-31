# 🧪 Backend Connectivity Testing Guide

## Quick Test Options

### Option 1: Browser Console (Easiest) ✅

1. **Start your React app**
   ```bash
   npm start
   ```

2. **Open Browser DevTools**
   - Press `F12` or `Ctrl+Shift+I`
   - Go to **Console** tab

3. **Copy & Paste This Code**
   ```javascript
   (async function testBackends() {
     console.clear();
     console.log('%c🧪 Backend Connectivity Test', 'font-size: 16px; font-weight: bold; color: #0066cc;');
     
     const backends = [
       { name: 'Express API (Local)', url: 'http://localhost:3000/api/health' },
       { name: 'PHP API (Production)', url: 'https://surewaygroupofschools.org/api/health' }
     ];

     for (const backend of backends) {
       try {
         console.log(`📍 Testing: ${backend.name}`);
         const response = await fetch(backend.url);
         const data = await response.json();
         console.log(`%c✅ Connected! Status: ${response.status}`, 'color: green;');
         console.log(data);
       } catch (error) {
         console.log(`%c❌ Failed: ${error.message}`, 'color: red;');
       }
       console.log('');
     }
   })();
   ```

4. **Press Enter**
   - See results immediately
   - ✅ = Connected
   - ❌ = Not reachable

---

### Option 2: Browser Network Tab (Detailed)

1. **Start your React app**
   ```bash
   npm start
   ```

2. **Open DevTools** (F12)

3. **Go to Network Tab**

4. **Perform an Action**
   - Try to login
   - Load a page
   - Click a button that makes API calls

5. **Check Network Requests**
   - Look for API calls (starting with `/api/`)
   - Click on a request
   - Check **Response** tab
   - Verify it connects to the correct URL

**What to Look For:**
- ✅ Status 200 = Success
- ⚠️ Status 401 = Unauthorized (but API responds)
- ❌ Status 404 = Endpoint not found
- ❌ Status 0 = Connection refused

---

### Option 3: Command Line Test

1. **Open Terminal** in admin folder

2. **Test Express API**
   ```bash
   curl http://localhost:3000/api/health
   ```

3. **Test PHP API**
   ```bash
   curl https://surewaygroupofschools.org/api/health
   ```

4. **Expected Response**
   ```json
   {
     "success": true,
     "message": "Success",
     "data": {
       "status": "OK",
       "message": "Fee Management System API is running",
       "timestamp": "2024-01-31T10:00:00+00:00"
     }
   }
   ```

---

### Option 4: Node.js Test Script

1. **Run the test script**
   ```bash
   node test-backend.js
   ```

2. **See results**
   ```
   🧪 Backend Connectivity Test
   
   📍 Testing: Express API (Local)
   ✅ Connected! (Status: 200)
   
   📍 Testing: PHP API (Production)
   ✅ Connected! (Status: 200)
   
   ✅ Working: 2/2
   ```

---

## What to Check

### 1. **Which API is Being Used?**

In browser console, check:
```javascript
console.log(process.env.REACT_APP_API_URL);
// Should show the API URL being used
```

### 2. **Is Frontend Connected to Backend?**

#### Check Network Requests
1. Open DevTools → Network tab
2. Make any API call (login, load page, etc.)
3. Look for requests to `/api/...`
4. Check the **Response** tab

#### Expected Flow
```
Frontend (localhost:3001)
         ↓
   Makes API call to
         ↓
Backend (localhost:3000 or surewaygroupofschools.org)
         ↓
Returns JSON response
         ↓
Frontend displays data
```

### 3. **Check for CORS Errors**

If you see this in console:
```
Access to XMLHttpRequest at 'https://...' from origin 'http://localhost:3001'
has been blocked by CORS policy
```

**This means:**
- Frontend is trying to reach backend ✅
- Backend doesn't allow this origin ❌
- Need to configure CORS on backend

---

## Testing Checklist

### Basic Connectivity
- [ ] Can ping Express API: `curl http://localhost:3000/api/health`
- [ ] Can ping PHP API: `curl https://surewaygroupofschools.org/api/health`
- [ ] Frontend loads without errors: `npm start`
- [ ] Browser console shows no critical errors

### API Communication
- [ ] Network tab shows API requests
- [ ] API requests go to correct URL
- [ ] Response status is 200 (or expected status)
- [ ] Response contains valid JSON

### Authentication
- [ ] Login endpoint responds
- [ ] Token is received on login
- [ ] Token is stored in cookies/headers
- [ ] Authenticated endpoints work (check `Authorization` header)

### Data Flow
- [ ] Student list loads from API
- [ ] Student details load correctly
- [ ] Charts display data from API
- [ ] Create/Update/Delete operations work

---

## Common Issues & Solutions

### Issue: "Cannot reach Express API"
```
❌ Connection Refused - Backend not running
```

**Solution:**
1. Start Express API:
   ```bash
   cd api
   npm install
   npm start
   ```
2. Check if it runs on port 3000
3. Verify no other app uses port 3000

### Issue: "Cannot reach PHP API"
```
❌ DNS Error - Invalid hostname
or
❌ Connection Refused
```

**Solution:**
1. Verify PHP API is deployed: Visit `https://surewaygroupofschools.org/api/health` in browser
2. Check database credentials in PHP `.env`
3. Verify `.htaccess` is present and mod_rewrite enabled
4. Check domain is correctly configured

### Issue: "CORS Error"
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Check PHP API `.env` has correct `FRONTEND_URL`
2. Verify CORS.php is configured correctly
3. Clear browser cache (Ctrl+Shift+R)
4. Restart dev server: `npm start`

### Issue: "Wrong API URL"
```
API calls go to wrong URL in Network tab
```

**Solution:**
1. Check `.env` files in `admin/` folder
2. Verify `REACT_APP_API_URL` is set correctly
3. Restart `npm start` to reload env vars
4. Check in console: `console.log(process.env.REACT_APP_API_URL)`

---

## Step-by-Step Testing

### Test 1: Express API (Local Development)

```bash
# Terminal 1: Start Express API
cd api
npm start
# Should see "Server running on port 3000"

# Terminal 2: Start React Frontend
cd admin
npm start
# Should see "Compiled successfully!"
```

### Test 2: Check Frontend → Backend Connection

```bash
# In browser console (F12)
fetch('http://localhost:3000/api/health')
  .then(r => r.json())
  .then(d => console.log('✅ Connected:', d))
  .catch(e => console.log('❌ Error:', e.message))
```

### Test 3: Check Which API is Active

```bash
# In browser console
console.log('Current API:', process.env.REACT_APP_API_URL)
console.log('Backend URL:', apiRequest.defaults.baseURL)
```

### Test 4: Make Authenticated Request

```bash
# In browser console
const token = document.cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
console.log('Token:', token)

fetch('http://localhost:3000/api/auth/me', {
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(r => r.json())
  .then(d => console.log('User:', d))
  .catch(e => console.log('Error:', e))
```

---

## Environment Configuration

### For Local Development (Express)
```
.env.development
REACT_APP_API_URL=http://localhost:3000/api
```

### For Production (PHP)
```
.env.production
REACT_APP_API_URL=https://surewaygroupofschools.org/api
```

### For Local Override
```
.env.local
REACT_APP_API_URL=https://surewaygroupofschools.org/api
```

---

## Test Results Interpretation

### All Green (Both APIs work)
```
✅ Express API (Local)
✅ PHP API (Production)
```
**Meaning:** Both backends are accessible. Use whichever you need.

### Only Express Works
```
✅ Express API (Local)
❌ PHP API (Production)
```
**Meaning:** 
- Use Express for development
- PHP API not yet deployed or has issues

### Only PHP Works
```
❌ Express API (Local)
✅ PHP API (Production)
```
**Meaning:**
- Express not running (start it if needed)
- PHP API is ready for production use

### None Work
```
❌ Express API (Local)
❌ PHP API (Production)
```
**Meaning:**
- Express not running
- PHP API not deployed
- Network/firewall issues

---

## Performance Testing

### Check API Response Time
```javascript
// In browser console
console.time('API Call');
fetch('http://localhost:3000/api/students')
  .then(r => r.json())
  .then(d => console.timeEnd('API Call'))
```

**Good Response Times:**
- Local API: < 100ms
- Remote API: < 500ms

---

## 📞 Getting Help

If tests fail:

1. **Check Express API**
   - Is it running? `npm start` in `api/` folder
   - Is port 3000 available? `netstat -ano | findstr :3000`

2. **Check PHP API**
   - Is it deployed? Visit URL in browser
   - Check server logs via cPanel
   - Test database connection

3. **Check Configuration**
   - Are `.env` files correct?
   - Is `REACT_APP_API_URL` set?
   - Restart `npm start` after changing `.env`

4. **Check Network**
   - Open DevTools → Network tab
   - See if request is made
   - Check response headers for CORS

---

**Need more help?** Check these files:
- `BACKEND_CONFIG_GUIDE.md` - Configuration details
- `PHP_API_INTEGRATION.md` - Integration guide
- `php-api/DEPLOYMENT.md` - PHP API deployment
