const db = require("../db/db");

module.exports = {
  addMember: (team_id, user_id, role = "member") =>
    db.prepare(`
      INSERT INTO team_members (team_id, user_id, role)
      VALUES (?, ?, ?)
    `).run(team_id, user_id, role),

  removeMember: (team_id, user_id) =>
    db.prepare(`
      DELETE FROM team_members
      WHERE team_id = ? AND user_id = ?
    `).run(team_id, user_id),

  getTeamMembers: (team_id) =>
    db.prepare(`
      SELECT u.id, u.name, u.email, tm.role
      FROM users u
      JOIN team_members tm ON tm.user_id = u.id
      WHERE tm.team_id = ?
    `).all(team_id),
};
