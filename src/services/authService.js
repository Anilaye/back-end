import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, insertUser } from "../models/userModel.js";

export async function registerUser({ name, email, password, role }) {
  const existing = findUserByEmail(email);
  if (existing) {
    console.log("Tentative d'inscription avec email déjà existant", { email });
    throw new Error("Email déjà utilisé");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const created = insertUser({ name, email, passwordHash, role });

  console.log("Utilisateur enregistré", { id: created.id, email: created.email, role: created.role });

  // Ne jamais renvoyer le hash
  return { id: created.id, name: created.name, email: created.email, role: created.role };
}

export async function loginUser({ email, password }) {
  const user = findUserByEmail(email);
  if (!user) {
    console.log("Login échoué: utilisateur introuvable", { email });
    throw new Error("Email ou mot de passe incorrect");
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    console.log("Login échoué: mauvais mot de passe", { email });
    throw new Error("Email ou mot de passe incorrect");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  console.log("Utilisateur connecté", { id: user.id, email: user.email, role: user.role });

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}
