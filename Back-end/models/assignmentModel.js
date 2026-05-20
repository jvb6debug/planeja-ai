const db = require("../db/db");

module.exports = {
  assignTask: (user_id, task_id, role = "assigned") =>
    db.prepare(`
      INSERT INTO user_tasks (user_id, task_id, role)
      VALUES (?, ?, ?)
    `).run(user_id, task_id, role),

  getTotalTasks: () =>
    db.prepare(`
      SELECT COUNT(*) AS total
      FROM user_tasks
    `).get(),

  getTasksDone: (user_id) =>
    db.prepare(`
      SELECT ut.*
      FROM user_tasks ut
      JOIN tasks t ON t.id = ut.task_id
      WHERE t.status = 'Done'
        AND ut.user_id = ?
    `).all(user_id),

  getTasksPending: (user_id) =>
    db.prepare(`
      SELECT ut.*
      FROM user_tasks ut
      JOIN tasks t ON t.id = ut.task_id
      WHERE t.status = 'Pending'
        AND ut.user_id = ?
    `).all(user_id),

  getTasksDue: (user_id) =>
    db.prepare(`
      SELECT ut.*
      FROM user_tasks ut
      JOIN tasks t ON t.id = ut.task_id
      WHERE t.status != 'Done'
        AND date(t.time_frame) <= date('now')
        AND ut.user_id = ?
    `).all(user_id),

  unassignTask: (user_id, task_id) =>
    db.prepare(`
      DELETE FROM user_tasks
      WHERE user_id = ? AND task_id = ?
    `).run(user_id, task_id),

  getUserTasks: (user_id) =>
    db.prepare(`
      SELECT t.*
      FROM tasks t
      JOIN user_tasks ut ON ut.task_id = t.id
      WHERE ut.user_id = ?
    `).all(user_id),

  getTaskUsers: (task_id) =>
    db.prepare(`
      SELECT u.*
      FROM users u
      JOIN user_tasks ut ON ut.user_id = u.id
      WHERE ut.task_id = ?
    `).all(task_id),
};
