import express from "express";
import {
  createReview,
  getAllReview,
  getProductReview,
  updateProductReview,
  deleteProductReview,
} from "../controllers/reviews.controller.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureCustomer, ensureAdmin } from "../middleware/roleValidation.js";
const router = express.Router();
router.get("/", getAllReview);

router.get("/:productId", getProductReview);

router.post("/:productId", loginRequired, ensureCustomer, createReview);
router.put("/:reviewId", loginRequired, ensureCustomer, updateProductReview);

router.delete("/:reviewId", loginRequired, ensureAdmin, deleteProductReview);

export default router;
