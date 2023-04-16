import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  getProductByName,
  updateOneProduct,
  removeOneProduct,
} from "../controllers/product.contollers.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", createProduct);
router.put("/:id", updateOneProduct);

// router.get("/:id", getOneProduct);
router.get("/:name", getProductByName);
router.delete("/:id", removeOneProduct);

export default router;
