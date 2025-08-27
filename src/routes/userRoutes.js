import { Router } from "express";
import {
  createUserController,
  listUsersController,
  getUser,
  removeUser,
} from "../controllers/userController.js";
import { authenticateToken, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticateToken, authorizeRoles("admin"), listUsersController);
router.get("/:id", authenticateToken, authorizeRoles("admin"), getUser);
router.post("/", authenticateToken, authorizeRoles("admin"), createUserController);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), removeUser);

export default router;
