import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logError, logInfo } from "../utils/logger.js";
import { supabase } from "../config/supabaseClient.js";

export async function registerUser({ email, password, role, name }) {
  try {
    // Vérifier si l'utilisateur existe déjà
    const { data: existing, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (findError && findError.code !== "PGRST116") { // PGRST116 = no rows found
      throw findError;
    }

    if (existing) {
      logError("Tentative d'inscription avec email déjà existant", { email });
      throw new Error("Email déjà utilisé");
    }

    // Hash du mot de passe
    const passwordHash = await bcrypt.hash(password, 10);

    // Création utilisateur dans Supabase
    const { data: created, error: insertError } = await supabase
      .from("users")
      .insert([{ email, password: passwordHash, role }])
      .select()
      .single();

    if (insertError) throw insertError;

    logInfo("Utilisateur enregistré", { id: created.id, email: created.email, role: created.role });

    return { id: created.id, email: created.email, role: created.role };
  } catch (error) {
    logError("Erreur lors de l'inscription", { error: error.message, email });
    throw error;
  }
}

export async function loginUser({ email, password }) {
  try {
    // Récupérer l'utilisateur par email
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      logError("Login échoué: utilisateur introuvable", { email });
      throw new Error("Email ou mot de passe incorrect");
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      logError("Login échoué: mauvais mot de passe", { email });
      throw new Error("Email ou mot de passe incorrect");
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    logInfo("Utilisateur connecté", { id: user.id, email: user.email, role: user.role });

    return { token, user: { id: user.id, email: user.email, role: user.role } };
  } catch (error) {
    logError("Erreur lors de la connexion", { error: error.message, email });
    throw error;
  }
}
