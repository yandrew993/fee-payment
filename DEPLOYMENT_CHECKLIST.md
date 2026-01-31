# 🚀 Deployment Checklist - React Admin + PHP API

## ✅ Pre-Deployment Requirements

### PHP API (Backend) - Must be Deployed First

- [ ] PHP API uploaded to `https://surewaygroupofschools.org/api`
- [ ] Database created: `fee_management`
- [ ] Database schema imported from `database.sql`
- [ ] `.env` file created with database credentials
- [ ] JWT_SECRET generated and set
- [ ] File permissions set (755 for folders, 644 for files)
- [ ] Test `/health` endpoint works
- [ ] CORS configured with correct frontend URL
- [ ] SSL certificate is valid

### React Admin (Frontend) - After PHP API is Ready

- [ ] All dependencies installed: `npm install`
- [ ] `.env.production` has correct PHP API URL
- [ ] Environment variable configured on Vercel dashboard
- [ ] Build successful locally: `npm run build`
- [ ] Network requests point to correct API URL

## 🔍 Pre-Deployment Tests

### Test PHP API Health

```bash
curl https://surewaygroupofschools.org/api/health
```

Expected response:
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

### Test PHP API Login

```bash
curl -X POST https://surewaygroupofschools.org/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Test React Build Locally

```bash
cd admin
npm run build
npm start
```

Then:
1. Open http://localhost:3001
2. Check Network tab for API calls
3. Verify API calls go to PHP API URL
4. Test login functionality

## 📋 Vercel Deployment Steps

### Step 1: Prepare Repository

```bash
cd admin
git add .
git commit -m "Configure PHP API backend integration"
git push origin main
```

### Step 2: Create Vercel Project

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your fee-payment repository
4. Configure project:
   - **Root Directory**: `admin`
   - **Framework Preset**: React
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables

In Vercel dashboard, add:

```
REACT_APP_API_URL=https://surewaygroupofschools.org/api
```

### Step 4: Deploy

Click **Deploy** button in Vercel

### Step 5: Verify Deployment

1. Wait for deployment to complete
2. Visit your Vercel URL (e.g., https://fee-payment.vercel.app)
3. Open DevTools → Network tab
4. Test login with admin credentials
5. Verify API calls go to `https://surewaygroupofschools.org/api`

## 🔐 Security Verification

- [ ] SSL certificate is valid on both domains
- [ ] API keys/secrets are not exposed in frontend code
- [ ] `.env.local` is git-ignored
- [ ] `.env.production` only contains non-sensitive values
- [ ] CORS is restricted to your frontend domain
- [ ] Database user has minimum required permissions
- [ ] Default admin password is changed

## 🧪 Post-Deployment Testing

### Test Authentication

```bash
# 1. Login
curl -X POST https://surewaygroupofschools.org/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# 2. Use returned token
TOKEN="eyJhbGc..."
curl -H "Authorization: Bearer $TOKEN" \
  https://surewaygroupofschools.org/api/auth/me
```

### Test Student Operations

```bash
TOKEN="your_token_here"

# Get all students
curl -H "Authorization: Bearer $TOKEN" \
  https://surewaygroupofschools.org/api/students

# Get single student
curl -H "Authorization: Bearer $TOKEN" \
  https://surewaygroupofschools.org/api/students/1
```

### Test Payments

```bash
TOKEN="your_token_here"

# Get payment data
curl -H "Authorization: Bearer $TOKEN" \
  https://surewaygroupofschools.org/api/fee-payments
```

### Test Reports

```bash
TOKEN="your_token_here"

# Get overall report
curl -H "Authorization: Bearer $TOKEN" \
  https://surewaygroupofschools.org/api/reports/overall
```

## 📊 Browser Testing Checklist

### Login Page
- [ ] Can see login form
- [ ] Can submit login credentials
- [ ] Receives token from API
- [ ] Redirects to dashboard after login
- [ ] Error message shows for invalid credentials

### Dashboard
- [ ] Charts load with data from PHP API
- [ ] Student list loads with pagination
- [ ] Can view student details
- [ ] Can create new student
- [ ] Can edit student information
- [ ] Can delete student

### Payments
- [ ] Payment list loads
- [ ] Can record new payment
- [ ] Can edit payment
- [ ] Can delete payment
- [ ] Payment totals calculate correctly

### Reports
- [ ] Overall report loads
- [ ] Class reports load
- [ ] Student payment history loads
- [ ] Term reports load

### Network Verification
- [ ] All API calls go to `https://surewaygroupofschools.org/api`
- [ ] No mixed content warnings
- [ ] No CORS errors
- [ ] Tokens are being sent in headers

## 🐛 Troubleshooting Deployment

### API Calls Still Going to Old URL

**Solution:**
1. Clear Vercel cache: Go to project settings → Deployment → Clear Cache
2. Redeploy: Click "Redeploy"
3. Hard refresh browser (Ctrl+Shift+R)

### CORS Errors After Deployment

**Solution:**
1. Check PHP API `.env` has correct `FRONTEND_URL_PROD`
2. Get your Vercel URL from Vercel dashboard
3. Update PHP API `.env`:
   ```env
   FRONTEND_URL_PROD=https://your-vercel-url.vercel.app
   ```
4. Restart PHP API or reupload `.env`

### 404 on API Calls

**Solution:**
1. Test PHP API directly: `curl https://surewaygroupofschools.org/api/health`
2. Verify PHP API is running
3. Check `/home/surewayg/public_html/api/` directory has all files
4. Verify `.htaccess` is present and correct
5. Ensure mod_rewrite is enabled: Contact hosting support

### "Invalid token" Errors

**Solution:**
1. Check JWT_SECRET is set in PHP API `.env`
2. Verify token is in `Authorization: Bearer TOKEN` header
3. Login again to get fresh token
4. Check token hasn't expired (7 days default)

## ✨ Final Verification

1. **API Health Check**
   ```bash
   curl https://surewaygroupofschools.org/api/health
   ```
   Should return success

2. **Frontend URL**
   ```
   https://your-app.vercel.app
   ```
   Should load without errors

3. **Functional Test**
   - Login with admin credentials
   - Load dashboard (should show charts)
   - View student list
   - Create a new record
   - Test API endpoints

4. **Performance Check**
   - Check page load time (< 3 seconds)
   - Check API response time (< 500ms)
   - Monitor Vercel analytics

## 📞 Support Resources

- **PHP API Issues**: See `php-api/DEPLOYMENT.md`
- **Frontend Issues**: See `admin/BACKEND_CONFIG_GUIDE.md`
- **Integration Issues**: See `admin/PHP_API_INTEGRATION.md`
- **API Documentation**: See `php-api/README.md`

## ✅ Success Criteria

✅ Deployment is successful when:
1. PHP API health check returns 200 OK
2. React app loads on Vercel URL
3. Login works with admin credentials
4. Dashboard displays data from PHP API
5. All CRUD operations work
6. Reports and analytics display correctly
7. No CORS errors in console
8. No 404 errors on API calls
9. Page loads in < 3 seconds
10. API responses in < 500ms
