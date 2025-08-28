import { supabase } from "../config/supabaseClient.js";
// import bcrypt from "bcryptjs";

// let users = [
//   {
//     id: 1,
//     name: "Admin",
//     email: "admin@anilaye.com",
//     password: bcrypt.hashSync("admin123", 10),
//     role: "admin"
//   }
// ];

export async function insertUser({ email, passwordHash, role = "admin", nom, prenom }) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: passwordHash, role, nom, prenom }])
    .select();
    if (error) throw error;
  return data[0];
}


export async function findAllUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
}

export async function findUserById(id) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function removeUserById(id) {
  const { data, error } = await supabase.from("users").delete().eq("id", id).select();
  if (error) throw error;
  return data[0]; // retourne l'utilisateur supprimé
}

// export function insertUser({ name, email, passwordHash, role }) {
//   const newUser = {
//     id: Date.now(),
//     name,
//     email,
//     password: passwordHash,
//     role: role || "user"
//   }
//   users.push(newUser);
//   return newUser;
// }
