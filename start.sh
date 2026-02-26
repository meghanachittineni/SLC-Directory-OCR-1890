#!/bin/bash
# Quick start script for the Directory OCR app

echo "🗂️  Starting Salt Lake City Directory OCR App..."

# Check for .env
if [ ! -f "backend/.env" ]; then
  echo "❌ Missing backend/.env — please create it with your GEMINI_API_KEY"
  exit 1
fi

# Start backend
echo "📡 Starting FastAPI backend on port 8000..."
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Give backend a moment to start
sleep 2

# Start frontend
echo "🖥️  Starting React frontend on port 3000..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo "✅ App running!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop both servers."

# Wait for interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Stopped.'" INT
wait
