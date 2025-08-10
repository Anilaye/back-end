let users = [
  { id: 1, name: "Awa Ndiaye", role: "artisane" },
  { id: 2, name: "Moussa Ba", role: "utilisateur" },
  { id: 3, name: "Fatou Sow", role: "utilisateur" }
];

module.exports = {
  getAll: () => users,
  getById: (id) => users.find((u) => u.id === id),
  add: (user) => {
    const newUser = { id: Date.now(), ...user };
    users.push(newUser);
    return newUser;
  },
  updateRole: (id, role) => {
    const user = users.find((u) => u.id === id);
    if (user) user.role = role;
    return user;
  },
  delete: (id) => {
    users = users.filter((u) => u.id !== id);
    return true;
  }
};