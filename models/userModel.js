import bcrypt from "bcryptjs";

let users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@anilaye.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin"
  }
];

export function getAllUsers() {
  return users;
}

export function getUserByEmail(email) {
  return users.find(u => u.email === email);
}

export function getUserById(id) {
  return users.find(u => u.id === id);
}

export function createUser({ name, email, password, role }) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    role
  };
  users.push(newUser);
  return newUser;
}

// export function updateUser(id, { name, email, password, role }) {
//   const user = users.find(u => u.id === id);
//   if (!user) return null;

//   if (name) user.name = name;
//   if (email) user.email = email;
//   if (password) user.password = bcrypt.hashSync(password, 10);
//   if (role) user.role = role;

//   return user;
// }

export function deleteUser(id) {
  users = users.filter(u => u.id !== id);
}
