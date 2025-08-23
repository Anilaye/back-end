import { registerUser, loginUser } from "../services/authService.js";

export async function register(req, res) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function login(req, res) {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
}
export async function logout(req, res) {
  res.status(200).json({ message: "Déconnexion réussie" });
}