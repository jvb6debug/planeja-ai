const Database = require("better-sqlite3");

const db = new Database("database.sqlite");
db.exec(`PRAGMA foreign_keys = ON;`);

// USERS
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  status TEXT CHECK(status IN ('Active', 'Vacation', 'Inactive')) NOT NULL DEFAULT 'Active',
  role TEXT NOT NULL DEFAULT 'User'
);
`);

// TASKS
db.exec(`
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK(status IN ('Pending', 'Doing', 'Done')) NOT NULL DEFAULT 'Pending',
  time_frame DATE,
  priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')) NOT NULL DEFAULT 'Medium',
  category TEXT
);
`);

// USER TASKS
db.exec(`
CREATE TABLE IF NOT EXISTS user_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  task_id INTEGER,
  role TEXT,
  done_at DATE,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(task_id) REFERENCES tasks(id) ON DELETE CASCADE
);
`);

// TEAMS
db.exec(`
CREATE TABLE IF NOT EXISTS teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  project TEXT
);
`);

// TEAM MEMBERS
db.exec(`
CREATE TABLE IF NOT EXISTS team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER,
  user_id INTEGER,
  role TEXT,
  FOREIGN KEY(team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
`);

module.exports = db;
