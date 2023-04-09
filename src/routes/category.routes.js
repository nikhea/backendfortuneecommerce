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
  "/category",
  //  loginRequired, ensureAdmin,
  getAllCategories
);

router.post("/category", loginRequired, ensureAdmin, CreateCategory);
// router.put("/products", updateOneProduct);

router.get("/category/:name", getOneCategories);
router.delete("/category/:id", loginRequired, removeOneCategories);

export default router;
