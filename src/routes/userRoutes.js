import { Router } from "express";
import { listUsers, getUser, removeUser } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", authenticateToken, authorizeRoles("admin"), listUsers);
router.get("/:id", authenticateToken, getUser);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), removeUser);

export default router;
