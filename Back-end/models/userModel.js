const db = require("../db/db");

module.exports = {
  create: (data) =>
    db.prepare(`
      INSERT INTO users (name, email, password_hash, status)
      VALUES (?, ?, ?, ?)
    `).run(data.name, data.email, data.password_hash, data.status),

  getAll: () => db.prepare(`SELECT * FROM users`).all(),

  getById: (id) =>
    db.prepare(`SELECT * FROM users WHERE id = ?`).get(id),

  getByUsername: (data) =>
    db.prepare(`SELECT * FROM users WHERE name = ?`).get(data.name),

  update: (id, data) =>
    db.prepare(`
      UPDATE users SET name=?, email=?, status=?
      WHERE id=?
    `).run(data.name, data.email, data.status, id),

  delete: (id) =>
    db.prepare(`DELETE FROM users WHERE id = ?`).run(id),
};
