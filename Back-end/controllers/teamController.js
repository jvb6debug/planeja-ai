const TeamMember = require("../models/teamMemberModel");

exports.addMember = (req, res) => {
  const { team_id, user_id, role } = req.body;
  const result = TeamMember.addMember(team_id, user_id, role);
  res.json({ id: result.lastInsertRowid });
};

exports.removeMember = (req, res) => {
  const { team_id, user_id } = req.body;
  TeamMember.removeMember(team_id, user_id);
  res.json({ removed: true });
};

exports.getTeamMembers = (req, res) => {
  res.json(TeamMember.getTeamMembers(req.params.team_id));
};
