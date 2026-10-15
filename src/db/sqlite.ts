import { Database } from 'bun:sqlite';
import type { Item } from '../types.js';

// Initialize SQLite with in-memory database or disk WAL mode
export const db = new Database(':memory:');

// Create Schema
db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert Seed Records
const insertInitial = db.prepare(`
  INSERT INTO items (title, description, status) 
  VALUES ($title, $description, $status)
`);

insertInitial.run({
  $title: 'Master Bun.serve and Zig Subsystems',
  $description: 'Understand JavaScriptCore execution and epoll event loops',
  $status: 'completed'
});

insertInitial.run({
  $title: 'Native Zero-Copy SQLite with bun:sqlite',
  $description: 'Direct binary bindings bypassing V8 node-gyp serialization',
  $status: 'in_progress'
});

export const itemRepository = {
  findAll(): Item[] {
    const query = db.query('SELECT id, title, description, status, created_at AS createdAt FROM items ORDER BY id ASC');
    return query.all() as Item[];
  },

  findById(id: number): Item | null {
    const query = db.query('SELECT id, title, description, status, created_at AS createdAt FROM items WHERE id = $id');
    return (query.get({ $id: id }) as Item) || null;
  },

  create(title: string, description = '', status = 'pending'): Item {
    const stmt = db.prepare(`
      INSERT INTO items (title, description, status)
      VALUES ($title, $description, $status)
      RETURNING id, title, description, status, created_at AS createdAt
    `);
    return stmt.get({ $title: title, $description: description, $status: status }) as Item;
  },

  delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM items WHERE id = $id');
    const result = stmt.run({ $id: id });
    return result.changes > 0;
  }
};
