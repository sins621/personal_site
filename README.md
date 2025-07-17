# Todo Application

A simple todo application with Go backend and HTMX frontend.

## Project Structure

```
├── backend/          # Go server and API
│   ├── main.go      # Main server file
│   ├── templates/   # HTML templates
│   └── README.md    # Backend documentation
├── frontend/         # Static frontend files
│   ├── index.html   # Main HTML page
│   └── README.md    # Frontend documentation
├── data/            # Database and persistent storage
│   └── lite.db      # SQLite database
└── dev.sh           # Development script
```

## Quick Start

1. Run the development server:
   ```bash
   ./dev.sh
   ```

2. Open your browser to `http://localhost:3000`

## Features

- Add, toggle, and delete todos
- Real-time updates using HTMX
- Clean dark theme with Tailwind CSS
- SQLite persistence
- Browser-sync for development
