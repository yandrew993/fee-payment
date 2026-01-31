# PHP API Integration with React Admin - Complete Guide

## ✅ What's Been Updated

The React admin frontend has been configured to work seamlessly with the PHP API backend.

### Changes Made

1. **`src/lib/apiRequest.js`**
   - Updated to use environment variable: `REACT_APP_API_URL`
   - Defaults to: `https://surewaygroupofschools.org/api`
   - Supports both development and production APIs

2. **`.env.development`**
   - Development environment configuration
   - Points to local Express API: `http://localhost:3000/api`

3. **`.env.production`** (NEW)
   - Production environment configuration
   - Points to PHP API: `https://surewaygroupofschools.org/api`

4. **`.env.example`** (NEW)
   - Template for local configuration
   - Shows all available options

5. **`BACKEND_CONFIG_GUIDE.md`** (NEW)
   - Complete configuration documentation
   - Troubleshooting guide
   - Deployment instructions

## 🚀 Getting Started

### Step 1: Local Development (with Express API)

```bash
cd admin

# Install dependencies (if needed)
npm install

# Start development server (uses .env.development)
npm start
```

This connects to Express API at: `http://localhost:3000/api`

### Step 2: Test with PHP API (Production)

To test against the production PHP API locally:

```bash
# Create .env.local to override development settings
echo "REACT_APP_API_URL=https://surewaygroupofschools.org/api" > .env.local

# Restart npm start
npm start
```

### Step 3: Build for Production

```bash
# Build for production (uses .env.production)
npm run build

# This creates optimized build using PHP API URL
```

## 🔗 API Integration Points

All frontend API calls go through:
- **File**: `src/lib/apiRequest.js`
- **Library**: `axios`
- **Base URL**: Dynamically loaded from environment

### Example API Calls

The frontend makes these types of requests to the PHP API:

```javascript
// Authentication
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET /api/auth/me

// Students
GET /api/students
POST /api/students
GET /api/students/:id
PATCH /api/students/:id
DELETE /api/students/:id

// Payments
GET /api/fee-payments
POST /api/fee-payments
GET /api/payment/monthly-stats

// Classes
GET /api/classes
POST /api/classes

// Reports
GET /api/reports/overall
GET /api/reports/class/:classId
GET /api/reports/student/:studentId
```

## 🧪 Testing the Integration

### In Browser Console

```javascript
// Check which API you're connected to
console.log(process.env.REACT_APP_API_URL);

// Make a test API call
fetch(process.env.REACT_APP_API_URL + '/health')
  .then(r => r.json())
  .then(d => console.log(d));
```

### Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Perform an action in the app (login, load students, etc.)
4. Verify API requests show correct URL in Network tab

### Expected Response Format

All PHP API responses follow this format:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    // Response data here
  },
  "code": 200
}
```

## 🔐 Environment Variable Security

### Development
- `.env.development` is committed (safe)
- Contains public values only
- Used during `npm start`

### Production
- `.env.production` is committed (safe)
- Used during `npm run build`
- Vercel overrides with dashboard env vars

### Local
- `.env.local` is git-ignored (never committed)
- For local development overrides only
- Never commit sensitive values here

## 📋 Configuration Checklist

### Before Deploying to Vercel

- [ ] PHP API is deployed and running
- [ ] PHP API `.env` has correct database credentials
- [ ] PHP API `.env` has `FRONTEND_URL_PROD=https://youradmin.vercel.app`
- [ ] React admin `.env.production` has correct PHP API URL
- [ ] CORS is properly configured in PHP API
- [ ] SSL certificate is valid on both domains

### Vercel Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Configure PHP API backend"
   git push origin main
   ```

2. **Create Vercel Project**
   - Visit https://vercel.com/new
   - Import repository
   - Configure environment variables:
     ```
     REACT_APP_API_URL=https://surewaygroupofschools.org/api
     ```

3. **Deploy**
   ```bash
   vercel deploy --prod
   ```

4. **Verify**
   - Visit your Vercel URL
   - Check Network tab for API calls to correct URL
   - Test login with admin credentials

## 🐛 Common Issues & Solutions

### Issue: CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Check PHP API CORS configuration
2. Verify `FRONTEND_URL_PROD` in PHP `.env`
3. Clear browser cache and hard reload (Ctrl+Shift+R)

### Issue: 404 Errors on All Requests
```
GET https://surewaygroupofschools.org/api/students 404
```

**Solution:**
1. Verify PHP API is deployed at the URL
2. Check `.htaccess` file exists and is correct
3. Verify mod_rewrite is enabled on server
4. Test with `curl` from server terminal

### Issue: API Calls Going to Wrong URL
```
Requests going to: http://localhost:3000/api
Should go to: https://surewaygroupofschools.org/api
```

**Solution:**
1. Check `.env` files in admin folder
2. Restart development server: `npm start`
3. Verify in browser console: `console.log(process.env.REACT_APP_API_URL)`

### Issue: Token Errors After Login
```
Invalid token or token expired
```

**Solution:**
1. Check JWT_SECRET in PHP API `.env`
2. Verify token is in Authorization header
3. Check token expiry (default 7 days)
4. Try logging in again

## 📊 Environment Variables Summary

| Variable | Development | Production | Purpose |
|----------|-------------|------------|---------|
| `REACT_APP_API_URL` | `http://localhost:3000/api` | `https://surewaygroupofschools.org/api` | Backend API URL |
| `BROWSER` | `none` | `none` | Don't auto-open browser |
| `PORT` | `3001` | N/A | Dev server port |

## 🔄 Switching Between APIs

### For Development (Express API)
```bash
# Use .env.development (default)
npm start
```

### For Testing (PHP API)
```bash
# Create .env.local
echo "REACT_APP_API_URL=https://surewaygroupofschools.org/api" > .env.local

npm start
```

### For Production (Vercel)
```bash
# Vercel uses .env.production automatically
npm run build
```

## 📞 Support

For issues with:
- **PHP API**: See `php-api/DEPLOYMENT.md`
- **Frontend Configuration**: See `BACKEND_CONFIG_GUIDE.md`
- **API Endpoints**: See `php-api/README.md`
- **Frontend Integration**: See `FRONTEND_INTEGRATION_GUIDE.md`
