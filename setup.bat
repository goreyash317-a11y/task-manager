@echo off
REM Task Manager MERN App - Local Development Setup Script for Windows
REM Run this script to set up the project locally for testing

echo.
echo 🚀 Task Manager MERN App - Setup Script
echo ========================================

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not installed. Please install from https://nodejs.org/
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% found

echo.
echo 📦 Setting up Backend...
cd backend
call npm install
echo ✅ Backend dependencies installed

REM Create .env file if it doesn't exist
if not exist .env (
    copy .env.example .env
    echo ✅ Created .env file - update with your MongoDB URI
)

cd ..

echo.
echo 📦 Setting up Frontend...
cd frontend
call npm install
echo ✅ Frontend dependencies installed

cd ..

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo   1. Update backend/.env with your MongoDB URI
echo   2. Start MongoDB: mongod
echo   3. Start Backend: cd backend ^&^& npm run dev
echo   4. Start Frontend: cd frontend ^&^& npm run dev (in new terminal)
echo   5. Open http://localhost:5173 in your browser
echo.