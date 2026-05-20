const db = require("../db/db");

module.exports = {
  create: (data) =>
    db.prepare(`
      INSERT INTO tasks (name, description, status, time_frame, priority, category)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      data.name,
      data.description,
      data.status,
      data.time_frame,
      data.priority,
      data.category
    ),

  getAll: () => db.prepare(`SELECT * FROM tasks`).all(),

  getByTimeFrame: () => db.prepare(`SELECT * FROM tasks ORDER BY time_frame DESC LIMIT 3`).all(),

  getById: (id) =>
    db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(id),

  update: (id, data) =>
    db.prepare(`
      UPDATE tasks
      SET name=?, description=?, status=?, time_frame=?, priority=?, category=?
      WHERE id=?
    `).run(
      data.name,
      data.description,
      data.status,
      data.time_frame,
      data.priority,
      data.category,
      id
    ),

  delete: (id) =>
    db.prepare(`DELETE FROM tasks WHERE id=?`).run(id),
};
