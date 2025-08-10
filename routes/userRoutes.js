const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUserRole,
  deleteUser
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id/role", updateUserRole);
router.delete("/:id", deleteUser);

module.exports = router;