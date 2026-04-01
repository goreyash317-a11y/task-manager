# Quick Start - Railway All-in-One Deployment

## ⚡ 5-Minute Setup

### All You Need
✅ GitHub account  
✅ Railway account (free tier)  
✅ **No external database needed** - Railway has MongoDB built-in!

---

## Step 1: Push Code to GitHub (1 min)

```bash
git add .
git commit -m "Task Manager for Railway"
git push origin main
```

---

## Step 2: Deploy Backend with MongoDB (2 min)

1. Go to https://railway.app
2. Login with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. **Add MongoDB Plugin:**
   - Click **Plugins** button
   - Select **MongoDB**
   - Click **Add**
6. **Add Environment Variables:**
   ```
   JWT_SECRET=your-random-secure-key
   NODE_ENV=production
   ```
   ⚠️ **MONGO_URI is auto-provided!** Don't set it.
7. **Deploy**
8. Copy your **backend URL** (e.g., `https://app.up.railway.app`)
   - ⚠️ **NO PORT NEEDED** - Railway uses standard HTTPS (port 443)
   - Backend internally runs on PORT 5000 (Railway handles routing)

---

## Step 3: Deploy Frontend (1 min)

1. Railway → **New Project** → **Create new service**
2. Select same GitHub repo
3. **Add Variable:**
   ```
   - ⚠️ **NO PORT NEEDED** - use standard URL without `:5000`
4. **Deploy**
5. Your **frontend URL** is your app!
   - Example: `https://taskmanager-app.up.railway.app` (no port needed)
4. **Deploy**
5. Your **frontend URL** is your app!

---

## 🎉 You're Done!

✅ Backend running with MongoDB on Railway  
✅ Frontend deployed on Railway  
✅ Both connected and working  

**Visit your frontend URL** and start managing tasks!

---

**Need details?** See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)