import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  getAllProduct,
  getProductsByTage,
  getProductBySlug,
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
router.patch("/:id", updateOneProduct);

// router.get("/:id", getOneProduct);
router.get("/:slug", getProductBySlug);
router.delete("/:id", removeOneProduct);

export default router;
