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

# Display BrowserSync banner
echo ""
echo " ___                                         ___  _  _           "
echo "| _ ) _ _  ___  _ __ __  ___ ___  _ _       / __|| || | _ _   __ "
echo "| _ \| '_|/ _ \ \ V  V /(_-// -_)| '_|      \__ \ \_. || ' \ / _|"
echo "|___/|_|  \___/  \_/\_/ /__/\___||_|        |___/ |__/ |_||_|\__|"
echo ""

# Start browser-sync to proxy the Go server
NODE_NO_WARNINGS=1 npx browser-sync start --proxy "localhost:8082" --files "frontend/**/*,backend/**/*" --ignore "data/**/*,backend/tmp/**/*" --no-notify --open
