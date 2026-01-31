# React Admin - Backend Configuration Guide

## 🔄 Backend API Configuration

The React admin frontend has been updated to use the PHP backend API at:
```
https://surewaygroupofschools.org/api
```

## 📝 Environment Configuration

The frontend uses environment variables to configure the API backend. This allows you to use different APIs for development and production.

### Files

1. **`.env.development`** - Used during local development (npm start)
   - `REACT_APP_API_URL=http://localhost:3000/api` (local Express API)
   
2. **`.env.production`** - Used when building for production (npm run build)
   - `REACT_APP_API_URL=https://surewaygroupofschools.org/api` (PHP API)

3. **`.env.local`** - Local overrides (git-ignored, not committed)
   - Create this file to override any settings locally
   - Example provided in `.env.example`

4. **`.env.example`** - Template for configuration
   - Shows all available options
   - Safe to commit to version control

## 🚀 Development Setup

### Option 1: Using Express API (Development)

```bash
# .env.development already points to Express API
npm start
```

This uses: `http://localhost:3000/api`

### Option 2: Using PHP API (Production)

```bash
# Create .env.local to override
echo "REACT_APP_API_URL=https://surewaygroupofschools.org/api" > .env.local

npm start
```

## 🏗️ Production Build

When building for Vercel or production:

```bash
npm run build
```

The build process automatically uses `.env.production` which points to:
```
https://surewaygroupofschools.org/api
```

## 🔧 How It Works

1. **API Initialization** (`src/lib/apiRequest.js`):
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || "https://surewaygroupofschools.org/api";
   const apiRequest = axios.create({
     baseURL: API_URL,
     withCredentials: true,
   });
   ```

2. **All API Calls** use this centralized axios instance
3. **Environment Variables** are substituted at build time
4. **Fallback** defaults to PHP API if no env var is set

## ✅ Verifying Configuration

### In Browser Console

After starting the app, all API calls should go to your configured backend:

```javascript
// Open browser DevTools → Network tab
// Check API requests are going to the correct URL
// Should see: https://surewaygroupofschools.org/api/...
```

### Via JavaScript

```javascript
// In browser console
console.log(process.env.REACT_APP_API_URL);
// Should output: https://surewaygroupofschools.org/api
```

## 🔐 Security Notes

- **Never commit `.env.local`** - Add to `.gitignore` (already done)
- **API keys should not be exposed** - Keep sensitive data on backend
- **CORS** is handled by the PHP backend (see CORS.php middleware)
- **Authentication tokens** are stored and sent via axios interceptors

## 🐛 Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. **Check PHP API `.env`** has correct `FRONTEND_URL_PROD`:
   ```env
   FRONTEND_URL_PROD=https://youradmin.vercel.app
   ```

2. **Verify CORS middleware** in PHP API is configured
3. **Check that API URL is correct** in React config

### API Not Found (404)

If endpoints return 404:

1. **Verify endpoint exists** in PHP API (`/api/health` should work)
2. **Check API URL** in environment variables is correct
3. **Ensure PHP API is deployed** and running
4. **Check `mod_rewrite`** is enabled on server

### Token Errors

If you see "Invalid token" errors:

1. **Check JWT_SECRET** is set in PHP API `.env`
2. **Verify token is being sent** in Authorization header
3. **Check token hasn't expired** (7 days default)

## 📦 Deployment to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update API backend configuration"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Import your repository
   - Add environment variable in Vercel dashboard:
     ```
     REACT_APP_API_URL=https://surewaygroupofschools.org/api
     ```

3. **Deploy**:
   - Vercel will automatically build and deploy
   - Uses `.env.production` + Vercel env vars

## 📚 Related Documentation

- **PHP API Setup**: See `php-api/DEPLOYMENT.md`
- **Frontend Integration**: See `FRONTEND_INTEGRATION_GUIDE.md`
- **API Endpoints**: See `php-api/README.md`

## ✨ Quick Reference

| Environment | API URL | Command |
|-------------|---------|---------|
| Local Dev | http://localhost:3000/api | `npm start` |
| Production | https://surewaygroupofschools.org/api | `npm run build` |
| Vercel | https://surewaygroupofschools.org/api | Auto (from Vercel env vars) |
