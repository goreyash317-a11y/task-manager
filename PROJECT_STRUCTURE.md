# Project Structure Overview

## Full Project Architecture

```
TaskManager/
│
├── 📁 backend/
│   ├── 📁 config/           (Database configuration)
│   │   └── (Reserved for future DB utilities)
│   │
│   ├── 📁 models/           (Data schemas)
│   │   ├── User.js          (User model with username, email, password)
│   │   └── Task.js          (Task model with CRUD fields)
│   │
│   ├── 📁 controllers/      (Business logic)
│   │   ├── authController.js   (Register, Login with JWT)
│   │   └── taskController.js   (Task CRUD operations)
│   │
│   ├── 📁 routes/           (API endpoints)
│   │   ├── auth.js          (POST /api/auth/register, login)
│   │   └── tasks.js         (GET, POST, PUT, DELETE /api/tasks)
│   │
│   ├── 📁 middleware/       (Middleware functions)
│   │   ├── auth.js          (JWT verification)
│   │   └── errorHandler.js  (Centralized error handling)
│   │
│   ├── 📁 utils/            (Utility functions)
│   │   └── (Reserved for helper functions)
│   │
│   ├── server.js            (Express server entry point)
│   ├── package.json         (Dependencies and scripts)
│   ├── .env                 (Environment variables)
│   ├── .env.example         (Example env file)
│   ├── railway.json         (Railway deployment config)
│   ├── .gitignore           (Git ignore files)
│   └── node_modules/        (Dependencies - not committed)
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 pages/        (Page components)
│   │   │   ├── Login.jsx       (Login page)
│   │   │   ├── Register.jsx    (Registration page)
│   │   │   ├── Dashboard.jsx   (Main task dashboard)
│   │   │   ├── Auth.css        (Auth page styles)
│   │   │   └── Dashboard.css   (Dashboard styles)
│   │   │
│   │   ├── 📁 components/   (Reusable components)
│   │   │   ├── ProtectedRoute.jsx   (Route guard for auth)
│   │   │   ├── TaskForm.jsx         (Add new task form)
│   │   │   ├── TaskList.jsx         (Task list container)
│   │   │   ├── TaskItem.jsx         (Individual task component)
│   │   │   └── Tasks.css            (Tasks styling)
│   │   │
│   │   ├── App.jsx          (Main app with routing)
│   │   ├── main.jsx         (React entry point)
│   │   ├── index.css        (Global styles)
│   │
│   ├── 📁 public/           (Static files)
│   │   └── (Can add icons, logos here)
│   │
│   ├── index.html           (HTML template)
│   ├── package.json         (Dependencies and scripts)
│   ├── vite.config.js       (Vite configuration)
│   ├── .env                 (Frontend env variables)
│   ├── .env.production      (Production env variables)
│   ├── railway.json         (Railway deployment config)
│   ├── .gitignore           (Git ignore files)
│   └── node_modules/        (Dependencies - not committed)
│
├── 📄 README.md             (Main project documentation)
├── 📄 QUICK_START.md        (5-minute setup guide)
├── 📄 RAILWAY_DEPLOYMENT.md (Detailed deployment guide)
├── 📄 PROJECT_STRUCTURE.md  (This file)
├── 📄 setup.sh              (Linux/Mac setup script)
├── 📄 setup.bat             (Windows setup script)
└── 📄 .gitignore            (Root level git ignore)
```

## 🔄 Data Flow

```
User → Frontend (React + Vite)
         ↓
    Axios HTTP Requests
         ↓
Backend API (Express.js)
         ↓
    Middleware (Auth, Error Handling)
         ↓
    Controllers (Business Logic)
         ↓
    MongoDB Database (Mongoose)
         ↓
    Response (JSON)
         ↓
Frontend UI Update
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Get JWT token

### Tasks (Protected Routes)
- `GET /api/tasks` - Fetch all user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed)
}
```

### Task Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String (enum: ['pending', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  deadline: Date,
  user: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication Flow

1. User registers with username, email, password
2. Password is hashed using bcryptjs (10 rounds)
3. User logs in with email and password
4. Server verifies password and generates JWT token
5. Frontend stores token in localStorage
6. Frontend sends token in Authorization header for protected routes
7. Backend middleware verifies token before processing requests

## 🚀 Deployment Architecture

### Local Development
```
Frontend (Vite)     Backend (Node.js)     Database (MongoDB)
http://localhost:5173 ← → http://localhost:5000 ← → localhost:27017
```

### Railway Production
```
Frontend    Backend             Database
Railway app ← → Railway app      MongoDB Atlas
:3000         :5000             Cloud
```

## 🛠️ Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend Framework | React | 18+ |
| Frontend Build | Vite | 4+ |
| Frontend HTTP | Axios | 1+ |
| Frontend Routing | React Router | 6+ |
| Backend Framework | Express | 4+ |
| Runtime | Node.js | 18+ |
| Database | MongoDB | (Atlas cloud) |
| ODM | Mongoose | 7+ |
| Authentication | JWT | jsonwebtoken |
| Password Hashing | bcryptjs | 2.4+ |
| Environment Vars | dotenv | 16+ |
| CORS | cors | 2.8+ |

## 📝 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/taskmanager
JWT_SECRET=your_secret_key_here
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend.up.railway.app
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.up.railway.app
```

## 🔄 Key Features Implementation

### Authentication
- JWT tokens stored in localStorage
- Protected routes using ProtectedRoute component
- Token sent in Authorization header
- Token expiration after 24 hours

### Task Management
- Full CRUD operations
- User-specific task isolation
- Real-time UI updates
- Sorting and filtering capabilities

### Error Handling
- Try-catch blocks in all controllers
- Centralized error middleware
- User-friendly error messages
- Proper HTTP status codes

## 🚀 Deployment Process

1. Code pushed to GitHub
2. Railway auto-detects and builds
3. Environment variables configured
4. Database connected
5. Frontend and backend deployed
6. Both services get unique URLs
7. Frontend URL served publicly
8. Backend API accessible from frontend

## 📦 Build & Run Commands

### Backend
```bash
npm run dev      # Development with nodemon
npm start        # Production
```

### Frontend
```bash
npm run dev      # Development with Vite
npm run build    # Production build
npm run preview  # Preview production build
```

---

**For deployment instructions**, see [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
**For quick setup**, see [QUICK_START.md](./QUICK_START.md)