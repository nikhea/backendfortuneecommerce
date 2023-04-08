import express from "express";
import {
  getUsers,
  getUsersById,
  getMe,
  removeOneUser,
} from "../controllers/user.controller.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureAdmin } from "../middleware/roleValidation.js";
const router = express.Router();

router.get("/", loginRequired, ensureAdmin, getUsers);

router.get("/me", loginRequired, getMe);

router.get("/:id", loginRequired, ensureAdmin, getUsersById);

router.delete("/:id", loginRequired, ensureAdmin, removeOneUser);
export default router;
