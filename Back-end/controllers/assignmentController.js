const Assignment = require("../models/assignmentModel");

exports.assignTask = (req, res) => {
  const { user_id, task_id, role } = req.body;
  const result = Assignment.assignTask(user_id, task_id, role);
  res.json({ id: result.lastInsertRowid });
};

exports.unassignTask = (req, res) => {
  const { user_id, task_id } = req.body;
  Assignment.unassignTask(user_id, task_id);
  res.json({ removed: true });
};

exports.getUserTasks = (req, res) => {
  res.json(Assignment.getUserTasks(req.params.user_id));
};

exports.getTaskUsers = (req, res) => {
  res.json(Assignment.getTaskUsers(req.params.task_id));
};
