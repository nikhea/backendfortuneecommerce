import express from "express";
import {
  CreateSubCategory,
  getAllSubCategories,
} from "../controllers/subCategory.controller.js";

const router = express.Router();

router.get("/subcategory", getAllSubCategories);

router.post("/subcategory", CreateSubCategory);
// router.put("/products", updateOneProduct);

// router.get("/:name/properties", getOneProduct);
// router.delete("/products", removeOneProduct);

export default router;
