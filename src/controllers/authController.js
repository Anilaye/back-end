import { registerUser, loginUser } from "../services/authService.js";

export async function register(req, res) {
  try {
    const { email, password, role, nom, prenom } = req.body;
    const user = await registerUser({ email, password, role, nom, prenom });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser({ email, password });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export async function logout(req, res) {
  res.status(200).json({ message: "Déconnexion réussie" });
}