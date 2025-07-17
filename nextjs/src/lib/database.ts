import sqlite3 from 'sqlite3';
import path from 'path';

export interface Todo {
  id: number;
  task: string;
  done: boolean;
}

interface TodoRow {
  id: number;
  task: string;
  done: number; // SQLite stores boolean as 0/1
}

class Database {
  private db: sqlite3.Database;

  constructor() {
    // Use the same database path as the Go app
    const dbPath = path.join(process.cwd(), '..', 'data', 'lite.db');
    this.db = new sqlite3.Database(dbPath);
    this.init();
  }

  private init() {
    // Create table if it doesn't exist
    this.db.run(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        done BOOLEAN DEFAULT FALSE
      )
    `);
  }

  async getTodos(): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT id, task, done FROM todos ORDER BY id', (err, rows: TodoRow[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map((row: TodoRow) => ({
            id: row.id,
            task: row.task,
            done: Boolean(row.done)
          })));
        }
      });
    });
  }

  async addTodo(task: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO todos (task) VALUES (?)', [task], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async toggleTodo(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE todos SET done = NOT done WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async deleteTodo(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM todos WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  close() {
    this.db.close();
  }
}

// Singleton instance
let database: Database | null = null;

export function getDatabase(): Database {
  if (!database) {
    database = new Database();
  }
  return database;
} 