import Database from "better-sqlite3";

export const db = new Database("forge.db");

export function initializeDatabase(): void {
    db.exec(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
        );`);
    db.exec(`CREATE TABLE IF NOT EXISTS refresh_tokens (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        token TEXT NOT NULL,
        expires_at TEXT NOT NULL
        );`);
}