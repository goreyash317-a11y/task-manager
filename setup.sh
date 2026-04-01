#!/bin/bash

# Task Manager MERN App - Local Development Setup Script
# Run this script to set up the project locally for testing

set -e

echo "🚀 Task Manager MERN App - Setup Script"
echo "========================================"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed. Please install from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found locally. Make sure MongoDB is running or use MongoDB Atlas."
fi

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Create .env file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file - update with your MongoDB URI"
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend
npm install
echo "✅ Frontend dependencies installed"

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Update backend/.env with your MongoDB URI"
echo "  2. Start MongoDB: mongod"
echo "  3. Start Backend: cd backend && npm run dev"
echo "  4. Start Frontend: cd frontend && npm run dev (in new terminal)"
echo "  5. Open http://localhost:5173 in your browser"
echo ""