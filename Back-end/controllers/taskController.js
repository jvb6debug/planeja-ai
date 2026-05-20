const Task = require("../models/taskModel");

exports.createTask = (req, res) => {
  const result = Task.create(req.body);
  res.json({ id: result.lastInsertRowid });
};

exports.getTasks = (req, res) => {
  res.json(Task.getAll());
};

exports.getTask = (req, res) => {
  res.json(Task.getById(req.params.id));
};

exports.updateTask = (req, res) => {
  Task.update(req.params.id, req.body);
  res.json({ updated: true });
};

exports.deleteTask = (req, res) => {
  Task.delete(req.params.id);
  res.json({ deleted: true });
};
