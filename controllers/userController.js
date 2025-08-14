import { getAllUsers, getUserById, deleteUser } from "../models/userModel.js";

export function listUsers(req, res) {
  res.json(getAllUsers());
}

export function getUser(req, res) {
  const user = getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json(user);
}

export function removeUser(req, res) {
  deleteUser(Number(req.params.id));
  res.json({ message: "Utilisateur supprimé" });
}
