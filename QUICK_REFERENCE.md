# 🚀 Quick Start - React Admin + PHP API

## ⚡ 30-Second Setup

### 1. Local Development (Express API)
```bash
cd admin
npm install
npm start
```
**API:** http://localhost:3000/api

### 2. Local with PHP API
```bash
echo "REACT_APP_API_URL=https://surewaygroupofschools.org/api" > .env.local
npm start
```
**API:** https://surewaygroupofschools.org/api

### 3. Production Build
```bash
npm run build
```
**Uses:** `.env.production` (PHP API automatically)

---

## 📋 Configuration Files

| File | Purpose | Environment |
|------|---------|-------------|
| `.env.development` | Dev API config | `npm start` |
| `.env.production` | Prod API config | `npm run build` |
| `.env.local` | Local override | Override any |
| `.env.example` | Template | Reference |

---

## 🔗 API URLs

- **Development (Express):** `http://localhost:3000/api`
- **Production (PHP):** `https://surewaygroupofschools.org/api`

---

## ✅ Verify Setup

### In Browser Console
```javascript
console.log(process.env.REACT_APP_API_URL);
// Should show: https://surewaygroupofschools.org/api
```

### Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Perform any action
4. Check API calls go to correct URL

### API Health Check
```bash
curl https://surewaygroupofschools.org/api/health
```

---

## 🚀 Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Create Vercel Project**
   - Go to https://vercel.com/new
   - Import repository
   - Set Root Directory: `admin`

3. **Add Environment Variable**
   ```
   REACT_APP_API_URL=https://surewaygroupofschools.org/api
   ```

4. **Deploy**
   - Click Deploy
   - Wait for build
   - Visit your URL

---

## 🔐 Important

- ✅ Never commit `.env.local`
- ✅ Use `.env.example` for reference
- ✅ Set environment variables on Vercel
- ✅ Keep API keys on backend only

---

## 📚 Documentation

| Guide | Topic |
|-------|-------|
| `BACKEND_CONFIG_GUIDE.md` | Configuration & troubleshooting |
| `PHP_API_INTEGRATION.md` | Integration details |
| `DEPLOYMENT_CHECKLIST.md` | Pre/post deployment |
| `INTEGRATION_COMPLETE.md` | Overview & summary |

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| CORS error | Check PHP `.env` `FRONTEND_URL_PROD` |
| API 404 | Test PHP API health check |
| Wrong API URL | Check `.env` files, restart `npm start` |
| Token error | Check JWT_SECRET in PHP `.env` |

---

## 📞 Support

- **Config Issues:** See `BACKEND_CONFIG_GUIDE.md`
- **Integration:** See `PHP_API_INTEGRATION.md`
- **Deployment:** See `DEPLOYMENT_CHECKLIST.md`
- **PHP API:** See `php-api/README.md`

---

**You're all set! 🎉**
