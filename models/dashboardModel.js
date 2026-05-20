const db = require("../db/db");

module.exports = {
  getUserStats: (user_id) => {
    return db.prepare(`
      SELECT
        (SELECT COUNT(*) FROM user_tasks WHERE user_id = ?) AS total_tasks,
        (SELECT COUNT(*) FROM user_tasks WHERE user_id = ? AND role = 'doing') AS tasks_doing,
        (SELECT COUNT(*) FROM user_tasks WHERE user_id = ? AND role = 'assigned') AS tasks_assigned,
        (SELECT COUNT(*) FROM task_completions WHERE user_id = ?) AS tasks_completed
    `).get(user_id, user_id, user_id, user_id);
  },

  getTeamStats: (team_id) => {
    return db.prepare(`
      SELECT
        COUNT(DISTINCT tm.user_id) AS total_members,
        COUNT(ut.task_id) AS total_tasks
      FROM team_members tm
      LEFT JOIN user_tasks ut ON ut.user_id = tm.user_id
      WHERE tm.team_id = ?
    `).get(team_id);
  },

  getGlobalStats: () => {
    return db.prepare(`
      SELECT
        (SELECT COUNT(*) FROM users) AS users,
        (SELECT COUNT(*) FROM tasks) AS tasks,
        (SELECT COUNT(*) FROM teams) AS teams,
        (SELECT COUNT(*) FROM user_tasks) AS assignments
    `).get();
  }
};
