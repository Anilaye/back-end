import bcrypt from "bcryptjs";
import { logInfo, logError } from "../utils/logger.js";
import { insertUser, findAllUsers, findUserById, removeUserById } from "../models/userModel.js";


export async function createUser({ email, password, role = "admin", nom, prenom }) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await insertUser({ email, passwordHash: hashedPassword, role, nom, prenom });
    logInfo(`Utilisateur créé: ${user.id}`);
    return user;
  } catch (error) {
    logError("Erreur création utilisateur", { error: error.message });
    throw error;
  }
}

export async function listUsersService() {
  try {
    const users = await findAllUsers();
    logInfo(`Liste des utilisateurs retournée`, { count: users.length });
    return users;
  } catch (error) {
    logError("Erreur récupération utilisateurs", { error: error.message });
    throw error;
  }
}


export async function getUserService(id) {
  try {
    const user = await findUserById(id);
    if (!user) {
      logError("Utilisateur non trouvé", { id });
      throw new Error("Utilisateur non trouvé");
    }
    logInfo("Utilisateur retourné", { id: user.id });
    return user;
  } catch (error) {
    logError("Erreur récupération utilisateur", { error: error.message, id });
    throw error;
  }
}

export async function deleteUserService(id) {
  try {
    const deletedUser = await removeUserById(id);
    if (!deletedUser) {
      logError("Suppression échouée: utilisateur introuvable", { id });
      throw new Error("Utilisateur non trouvé");
    }
    logInfo("Utilisateur supprimé", { id: deletedUser.id });
    return { message: "Utilisateur supprimé", user: deletedUser };
  } catch (error) {
    logError("Erreur suppression utilisateur", { error: error.message, id });
    throw error;
  }
}
