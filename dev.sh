#!/usr/bin/env bash

# Start Air in the background
air &

# Capture the PID of Air so we can clean up later if needed
AIR_PID=$!

# Start BrowserSync in the foreground (so Ctrl+C stops it cleanly)
browser-sync start \
  --proxy "localhost:8082" \
  --files --files "static/**/*" \
  --browser "false" \
  # --logLevel debug

# When BrowserSync exits, kill Air
kill $AIR_PID
