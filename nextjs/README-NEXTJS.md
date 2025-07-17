# Next.js Todo App

A complete replication of the Go HTMX todo application built with Next.js, TypeScript, and SQLite.

## Features

- ✅ **Complete Feature Parity**: All CRUD operations (Create, Read, Update, Delete) for todos
- ✅ **Same Database**: Uses the same SQLite database as the Go app (`../data/lite.db`)
- ✅ **Identical Styling**: Matches the dark theme and layout of the original HTMX app
- ✅ **Real-time Updates**: Automatic UI updates after each operation
- ✅ **TypeScript**: Fully typed for better developer experience
- ✅ **Modern Stack**: Next.js 15 with App Router, Tailwind CSS, and SQLite

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
nextjs/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── todos/        # GET /api/todos
│   │   │   ├── add/          # POST /api/add
│   │   │   ├── toggle/       # POST /api/toggle
│   │   │   └── delete/       # POST /api/delete
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main todo page
│   ├── components/           # React components
│   │   ├── AddTodoForm.tsx   # Add todo form
│   │   ├── TodoList.tsx      # Todo list container
│   │   └── TodoItem.tsx      # Individual todo item
│   └── lib/
│       └── database.ts       # SQLite database utilities
├── package.json
└── README-NEXTJS.md
```

## API Endpoints

All endpoints match the Go app's API for consistency:

- `GET /api/todos` - Fetch all todos
- `POST /api/add` - Add a new todo (FormData: `task`)
- `POST /api/toggle` - Toggle todo completion (FormData: `id`)
- `POST /api/delete` - Delete a todo (FormData: `id`)

## Database

The app uses the same SQLite database as the Go HTMX app:
- **Location**: `../data/lite.db`
- **Schema**: `todos` table with `id`, `task`, and `done` columns
- **Shared**: Both apps can read/write to the same database

## Key Differences from Go App

1. **Client-side Rendering**: React handles UI updates vs. server-side HTMX
2. **JSON API**: Returns JSON responses vs. HTML templates
3. **TypeScript**: Fully typed vs. dynamic Go
4. **Component Architecture**: Modular React components vs. Go templates

## Development

- **Build**: `npm run build`
- **Lint**: `npm run lint`  
- **Type Check**: TypeScript compiler built into Next.js
- **Hot Reload**: Automatic refresh on code changes

## Production Deployment

The app is ready for production deployment on platforms like Vercel, Netlify, or any Node.js hosting service. The SQLite database will need to be properly configured for production use. 