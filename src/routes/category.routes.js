import express from "express";
import {
  CreateCategory,
  getAllCategories,
  removeOneCategories,
  getOneCategories,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/category", getAllCategories);

router.post("/category", CreateCategory);
// router.put("/products", updateOneProduct);

router.get("/category/:name", getOneCategories);
router.delete("/category/:id", removeOneCategories);

export default router;
