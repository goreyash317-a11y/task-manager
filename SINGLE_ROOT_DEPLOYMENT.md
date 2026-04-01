# 🚀 Single-Root Deployment Guide (FINAL - No Mistakes)

## Architecture
```
One Server: Backend (Express) serves both API and Static Frontend
├── Backend (Express Server on port 5000)
│   ├── API Routes: /api/*
│   └── Static Files: Frontend build output
└── MongoDB (External service)
```

---

## 🏠 Local Development Setup

### 1. **Install Dependencies**
```bash
# Backend
cd backend
npm install

# Frontend (will auto-build on first install)
# Already built by backend's postinstall script
```

### 2. **Ensure MongoDB is Running**
```bash
# On Windows, MongoDB service should be running
# Or run MongoDB locally:
mongosh
```

### 3. **Start Backend** (from backend folder)
```bash
npm run dev
```

### 4. **Test the App**
- Open: `http://localhost:5000`
- Should see your frontend (React app)
- API: `http://localhost:5000/api/tasks`

---

## ☁️ Railway Deployment (Production)

### Step 1: Delete Old Frontend Service
- Go to Railway Dashboard
- Delete the **Frontend** service (we don't need separate frontend service)
- Keep only **Backend** service and **MongoDB** service

### Step 2: Configure Backend Environment Variables
1. Go to Railway Dashboard → **Backend** service → **Variables**
2. Add/Update these variables:
   ```
   JWT_SECRET=your-secure-random-key-here
   NODE_ENV=production
   PORT=5000
   ```
   
3. MongoDB is automatic (Railway provides it if you added MongoDB plugin)

### Step 3: Deploy Backend
1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Single-root deployment"
   git push
   ```

2. Go to Railway → Backend Service
3. Click **Redeploy** (or it auto-deploys on git push)
4. Wait 2-5 minutes for deployment

### Step 4: Test Production
- Get your backend Railway URL from the dashboard
- Open: `https://your-backend-url.up.railway.app`
- Should see: Task Manager login page
- Login and test creating tasks

---

## ✅ Verification Checklist

- [ ] Backend deployed to Railway
- [ ] MongoDB connected (check Railway logs)
- [ ] Frontend loads at backend URL (http://localhost:5000 or Railway URL)
- [ ] Login page appears
- [ ] Can register new account
- [ ] Can login
- [ ] Can create, update, delete tasks
- [ ] No 502 errors
- [ ] No CORS errors

---

## 🔍 Troubleshooting

### Still getting 502?
1. **Check Backend Logs** → Railway Dashboard → Backend → Logs
   - Look for MongoDB connection errors
   - Look for port binding errors

2. **Verify Frontend Built**
   - Check if `backend/dist` folder exists with many files
   - If missing, run: `cd frontend && npm run build` (from frontend folder)

3. **Check API Route**
   - Open: `http://localhost:5000/api/health`
   - Should return: `{ message: 'Task Manager API is running!' }`

### MongoDB Connection Failed?
1. Go to Railway Dashboard → MongoDB service
2. Verify it's running (green status)
3. Copy the MongoDB URI from Variables
4. Add to Backend Variables as `MONGO_URI`

### Frontend not loading?
1. Verify `backend/dist` folder exists
2. Verify index.html is in `backend/dist`
3. Check browser console (F12) for errors

---

## 📂 File Structure (After Build)
```
backend/
├── dist/                    ← Frontend build (served as static)
│   ├── index.html
│   ├── assets/
│   └── ...
├── server.js               ← Serves dist + API routes
├── package.json            ← Has postinstall script
├── .env                    ← Dev config
├── .env.production         ← Production config
└── routes/
    ├── auth.js
    └── tasks.js
```

---

## 🎯 What Changed?
- ❌ No more separate frontend service
- ❌ No more VITE_API_URL environment variable
- ✅ Single backend server serves everything
- ✅ Frontend uses relative `/api/*` URLs
- ✅ Automatic frontend build during npm install
- ✅ Simpler, more reliable deployment

---

**You're all set!** No more 502 errors or config mistakes!
