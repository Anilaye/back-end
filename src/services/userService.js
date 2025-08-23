import { findAllUsers, findUserById, removeUserById } from "../models/userModel.js";

export async function listUsersService() {
  const users = findAllUsers().map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role }));
  console.log("Liste des utilisateurs retournée", { count: users.length });
  return users;
}

export async function getUserService(id) {
  const user = findUserById(id);
  if (!user) {
    console.log("Utilisateur non trouvé", { id });
    throw new Error("Utilisateur non trouvé");
  }
  console.log("Utilisateur retourné", { id: user.id });
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function deleteUserService(id) {
  const ok = removeUserById(id);
  if (!ok) {
    console.log("Suppression échouée: utilisateur introuvable", { id });
    throw new Error("Utilisateur non trouvé");
  }
  console.log("Utilisateur supprimé", { id });
  return { message: "Utilisateur supprimé" };
}
