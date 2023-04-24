import express from "express";
import {
  CreateSubCategory,
  getAllSubCategories,
  removeOneSubCategories,
  getOneSubCategories,
} from "../controllers/subCategory.controller.js";

const router = express.Router();

router.get("/", getAllSubCategories);

router.post("/", CreateSubCategory);
// router.put("/products", updateOneProduct);

router.get("/:name", getOneSubCategories);
router.delete("/:id", removeOneSubCategories);

export default router;
