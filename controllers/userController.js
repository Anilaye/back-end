const User = require("../models/userModel");

exports.getUsers = (req, res) => {
  res.json({ success: true, data: User.getAll() });
};

exports.getUser = (req, res) => {
  const user = User.getById(parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: "Utilisateur introuvable" });
  res.json({ success: true, data: user });
};

exports.createUser = (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) return res.status(400).json({ success: false, message: "Nom et rôle requis" });
  const newUser = User.add({ name, role });
  res.status(201).json({ success: true, data: newUser });
};

exports.updateUserRole = (req, res) => {
  const { role } = req.body;
  const updated = User.updateRole(parseInt(req.params.id), role);
  if (!updated) return res.status(404).json({ success: false, message: "Utilisateur introuvable" });
  res.json({ success: true, data: updated });
};

exports.deleteUser = (req, res) => {
  User.delete(parseInt(req.params.id));
  res.json({ success: true, message: "Utilisateur supprimé" });
};
