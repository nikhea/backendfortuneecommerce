import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateOneProduct,
  removeOneProduct,
} from "../controllers/product.contollers.js";

const router = express.Router();

router.get("/products", getAllProducts);

router.post("/products", createProduct);
router.put("/products", updateOneProduct);

router.get("/products/:id", getOneProduct);
router.delete("/products/:id", removeOneProduct);

export default router;
