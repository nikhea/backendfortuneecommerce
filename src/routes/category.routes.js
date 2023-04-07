import express from "express";
import {
  CreateCategory,
  getAllCategories,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/category", getAllCategories);

router.post("/category", CreateCategory);
// router.put("/products", updateOneProduct);

// router.get("/:name/properties", getOneProduct);
// router.delete("/products", removeOneProduct);

export default router;
