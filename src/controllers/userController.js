import { deleteUserService, getUserService, listUsersService } from "../services/userService.js";

export async function listUsers(req, res) {
  try {
    const data = await listUsersService();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function getUser(req, res) {
  try {
    const data = await getUserService(req.params.id);
    res.json(data);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}

export async function removeUser(req, res) {
  try {
    const result = await deleteUserService(req.params.id);
    res.json(result);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
