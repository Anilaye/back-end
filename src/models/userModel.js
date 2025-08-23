import bcrypt from "bcrypt";

let users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@anilaye.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin"
  }
];

export function findAllUsers() {
  return users;
}

export function findUserById(id) {
  return users.find(u => u.id === Number(id));
}

export function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

export function insertUser({ name, email, passwordHash, role }) {
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: passwordHash,
    role: role || "user"
  };
  users.push(newUser);
  return newUser;
}

export function removeUserById(id) {
  users = users.filter(u => u.id !== Number(id));
}
