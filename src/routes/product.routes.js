import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  getAllProduct,
  getProductsByTage,
  getProductByName,
  updateOneProduct,
  removeOneProduct,
} from "../controllers/product.contollers.js";
import { filitersModels } from "../middleware/modelPagination.js";
import Product from "../models/products.models.js";
const router = express.Router();

router.get("/all", getAllProduct);
router.get("/", filitersModels(Product), getAllProducts);
router.get("/tag", getProductsByTage);
router.post("/", createProduct);
router.put("/:id", updateOneProduct);

// router.get("/:id", getOneProduct);
router.get("/:name", getProductByName);
router.delete("/:id", removeOneProduct);

export default router;
