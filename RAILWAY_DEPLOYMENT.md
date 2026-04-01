# Railway Deployment Guide - All-in-One Platform

Complete step-by-step guide to deploy Task Manager to Railway with integrated MongoDB.

## 🎯 Why Railway All-in-One?

✅ **Simpler**: MongoDB managed by Railway  
✅ **Faster**: No external database setup  
✅ **Cheaper**: All free tier included  
✅ **Easier**: Environment variables auto-injected  
✅ **Better**: Everything in one dashboard  

---

## 📋 Prerequisites

- GitHub account with this repository
- Railway account (https://railway.app) - **FREE!**
- **No MongoDB Atlas needed!**

---

## 🚀 Step 1: Push Code to GitHub (1 minute)

---

## 🚀 Step 2: Push Code to GitHub (1 minute)

```bash
cd TaskManager
git add .
git commit -m "Task Manager ready for Railway"
git push origin main
```

---

## 📱 Step 3: Deploy Backend with MongoDB (2 minutes)

### 3.1 Create Railway Project
1. Go to **https://railway.app**
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Select your repository
5. Click **"Deploy"**

### 3.2 Add MongoDB Plugin
1. Click **"Plugins"** or **"Add"**
2. Select **"MongoDB"**
3. Click **"Deploy"**

⏳ Wait 1-2 minutes for MongoDB to initialize.

### 3.3 Add Variables
1. Click **backend service**
2. Go to **"Variables"**
3. Add:
   ```
   JWT_SECRET=your-random-key-here
   NODE_ENV=production
   ```
4. **⚠️ DO NOT set MONGO_URI** - Railway auto-provides it!
5. Click **"Deploy"**

✅ Save your **backend URL** (e.g., `https://taskmanager-backend.up.railway.app`)
   - **NO PORT NUMBER NEEDED** - Railway uses standard HTTPS (port 443)
   - Backend internally runs on PORT 5000 (Railway handles routing)

---

## 🎨 Step 4: Deploy Frontend (1 minute)

### 4.1 Create Frontend Service
1. **Create new service** (same GitHub repo)
2.Wait for Vite auto-detection

### 4.2 Add Variable
1. Go to **"Variables"**
2. Add:
   ```
   VITE_API_URL=https://your-backend-url.up.railway.app
   ```
   - **NO PORT NUMBER** - use `https://` without `:5000` or `:3000`
   - Railway handles port routing automatically
3. Click **"Deploy"**

✅ Your app is live at your **frontend URL**!

---

## 🧪 Step 5: Test Your App

1. Visit your **frontend URL** in browser
2. **Register** with any email/password
3. **Login** with those credentials
4. **Add a task** - verify it appears
5. **Edit the task** - verify changes
6. **Mark complete** - verify status updates
7. **Delete task** - verify it disappears
8. **Logout** - verify redirect to login

✅ If all work, you're done!

---

## 🔧 Troubleshooting

### Backend won't deploy
- Check logs in Railway dashboard
- Ensure MongoDB plugin was added
- Wait 5 minutes for full initialization

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct (no trailing slash)
- Check backend URL directly in browser
- Hard refresh frontend: `Ctrl+F5`

### MongoDB not found
- Go to backend service → Check Dependencies
- Should show MongoDB service listed
- If not, add Plugin again

### 401 Unauthorized errors
- You're not logged in - register first
- Token may have expired - logout and login again

### Slow first deployment
- First build takes 5-10 minutes
- Subsequent deploys are 1-2 minutes
- Be patient!

---

## 📝 Environment Variables Explained

### Backend (Railway auto-provides these)
```
MONGO_URI=mongodb://[user]:[password]@mongo:27017/taskmanager
MONGO_USER=generated_by_railway
MONGO_PASSWORD=generated_by_railway
```

**You set:**
```
JWT_SECRET=your_secret_key
NODE_ENV=production
```

### Frontend (You set)
```
VITE_API_URL=https://backend-url.up.railway.app
```

---

## 🎯 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Railway
- [ ] MongoDB plugin added
- [ ] JWT_SECRET set
- [ ] Frontend deployed on Railway
- [ ] VITE_API_URL set
- [ ] Test register/login working
- [ ] Test add/edit/delete task working
- [ ] Test logout working
- [ ] Share URL with others

---

## 📊 Free Tier Limits

- **Backend**: Unlimited requests, fast
- **MongoDB**: 5 GB storage (enough for ~100,000 tasks)
- **Frontend**: Unlimited static hosting

All sufficient for college projects!

---

## 🆘 Get Help

- Railway Docs: https://docs.railway.app
- MongoDB Docs: https://docs.mongodb.com  
- Check Railway Logs: Dashboard → Service → Logs tab

---

## 🎉 Summary

✅ Backend deployed with MongoDB on Railway
✅ Frontend deployed on Railway
✅ All services integrated automatically
✅ App live and accessible worldwide
✅ Easy to maintain and update

**Your Task Manager is live!** 🚀
