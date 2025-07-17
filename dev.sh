#!/bin/bash

# Kill any existing processes on our ports
pkill -f "air"
pkill -f "go run main.go"
pkill -f "browser-sync"

# Start Air in the background from backend directory
cd backend
air &
cd ..

# Wait a moment for the server to start
sleep 2

# Start browser-sync to proxy the Go server
NODE_NO_WARNINGS=1 npx browser-sync start --proxy "localhost:8082" --files "frontend/**/*,backend/**/*" --ignore "data/**/*,backend/tmp/**/*" --no-notify --open
