import express from "express";
import {
  CreateSubCategory,
  getAllSubCategories,
  updateOneSubCategory,
  getAllSubCategoriesPagination,
  removeOneSubCategories,
  getOneSubCategories,
} from "../controllers/subCategory.controller.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureAdmin } from "../middleware/roleValidation.js";
const router = express.Router();

router.get("/", getAllSubCategories);
router.get("/pagination", getAllSubCategoriesPagination);

router.post("/", loginRequired, ensureAdmin, CreateSubCategory);
// router.put("/products", updateOneProduct);
router.patch("/:name", loginRequired, ensureAdmin, updateOneSubCategory);

router.get("/:name", getOneSubCategories);
router.delete("/:id", loginRequired, ensureAdmin, removeOneSubCategories);

export default router;
