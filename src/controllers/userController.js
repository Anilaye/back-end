import {
  createUser,
  listUsersService,
  getUserService,
  deleteUserService,
} from "../services/userService.js";


export async function createUserController(req, res) {
  try {
    const { email, password, role, name } = req.body;
    const user = await createUser({ email, password, role, name });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function listUsersController(req, res) {
  try {
    const users = await listUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await getUserService(id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function removeUser(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteUserService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
