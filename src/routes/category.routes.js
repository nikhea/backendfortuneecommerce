import express from "express";
import {
  CreateCategory,
  getAllCategories,
  removeOneCategories,
  getOneCategories,
} from "../controllers/category.controller.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureAdmin } from "../middleware/roleValidation.js";
const router = express.Router();

router.get(
  "/",
  //  loginRequired, ensureAdmin,
  getAllCategories
);

router.post("/", loginRequired, ensureAdmin, CreateCategory);
// router.put("/products", updateOneProduct);

router.get("/:name", getOneCategories);
router.delete("/:id", loginRequired, removeOneCategories);

export default router;
