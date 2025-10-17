@echo off
start cmd /k "cd backend && python app.py"
start cmd /k "cd movie-frontend && npm run dev"
