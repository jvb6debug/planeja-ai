const User = require("../models/userModel");

exports.createUser = (req, res) => {
  const result = User.create(req.body);
  res.json({ id: result.lastInsertRowid });
};

exports.getUsers = (req, res) => {
  res.json(User.getAll());
};

exports.getUser = (req, res) => {
  res.json(User.getById(req.params.id));
};

exports.updateUser = (req, res) => {
  User.update(req.params.id, req.body);
  res.json({ updated: true });
};

exports.deleteUser = (req, res) => {
  User.delete(req.params.id);
  res.json({ deleted: true });
};
