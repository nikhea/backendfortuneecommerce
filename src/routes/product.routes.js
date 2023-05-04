import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  getProductByName,
  updateOneProduct,
  removeOneProduct,
} from "../controllers/product.contollers.js";
import { filitersModels } from "../middleware/modelPagination.js";
import Product from "../models/products.models.js";
const router = express.Router();

router.get("/", filitersModels(Product), getAllProducts);

router.post("/", createProduct);
router.put("/:id", updateOneProduct);

// router.get("/:id", getOneProduct);
router.get("/:name", getProductByName);
router.delete("/:id", removeOneProduct);

export default router;
