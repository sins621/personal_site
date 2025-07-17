#!/bin/bash

# Kill any existing processes on our ports
pkill -f "go run main.go"
pkill -f "browser-sync"

# Start the Go server in the background from backend directory
cd backend
go run main.go &
cd ..

# Wait a moment for the server to start
sleep 2

# Start browser-sync to proxy the Go server
npx browser-sync start --proxy "localhost:8082" --files "frontend/**/*,backend/**/*" --ignore "data/**/*" --no-notify --open
