import express from "express";
import {
  CreateSubCategory,
  getAllSubCategories,
  removeOneSubCategories,
  getOneSubCategories,
} from "../controllers/subCategory.controller.js";

const router = express.Router();

router.get("/subcategory", getAllSubCategories);

router.post("/subcategory", CreateSubCategory);
// router.put("/products", updateOneProduct);

router.get("/subcategory/:name", getOneSubCategories);
router.delete("/subcategory/:id", removeOneSubCategories);

export default router;
