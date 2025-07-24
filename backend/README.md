## Running the Server

### Development (with hot reload)
```bash
cd backend
air
```

### Production
```bash
cd backend
go run main.go
```

The server will start on port 8082.

## Development Tools

- **Air** - Hot reloading for Go development
- Configuration in `.air.toml`
- Automatically rebuilds and restarts on file changes

## Database

Uses SQLite database stored in `../data/lite.db` for persistence. The database file will be created automatically if it doesn't exist. Database files are kept separate from source code in the `data/` directory.
