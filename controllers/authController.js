import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "../models/userModel.js";

export function register(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  if (getUserByEmail(email)) {
    return res.status(400).json({ message: "Email déjà utilisé" });
  }

  const newUser = createUser({ name, email, password, role });
  res.status(201).json({ message: "Utilisateur créé", user: { id: newUser.id, name, email, role } });
}

export function login(req, res) {
  const { email, password } = req.body;
  const user = getUserByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}
