const Dashboard = require("../models/dashboardModel");

exports.userStats = (req, res) => {
  res.json(Dashboard.getUserStats(req.params.user_id));
};

exports.teamStats = (req, res) => {
  res.json(Dashboard.getTeamStats(req.params.team_id));
};

exports.globalStats = (req, res) => {
  res.json(Dashboard.getGlobalStats());
};
