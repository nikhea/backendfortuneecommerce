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
  removeProductImage,
} from "../controllers/product.contollers.js";
import { filitersModels } from "../middleware/modelPagination.js";
import Product from "../models/products.models.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureAdmin } from "../middleware/roleValidation.js";
const router = express.Router();

router.get("/all", getAllProduct);
router.get("/", filitersModels(Product), getAllProducts);
router.get("/tag", getProductsByTage);
router.get("/:slug", getProductBySlug);

router.post("/", loginRequired, ensureAdmin, createProduct);
router.patch("/:id", loginRequired, ensureAdmin, updateOneProduct);
router.delete("/:id", loginRequired, ensureAdmin, removeOneProduct);
router.delete(
  "/:id/images/:assetId",
  loginRequired,
  ensureAdmin,
  removeProductImage
);
export default router;
// router.get("/:id", getOneProduct);
