import express from "express";
import {
  createCart,
  getAllCart,
  clearCart,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from "../controllers/cart.contollers.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureAdmin, ensureCustomer } from "../middleware/roleValidation.js";
const router = express.Router();

router.get("/", loginRequired, ensureCustomer, getAllCart);

router.post("/", loginRequired, ensureCustomer, createCart);
router.patch(
  "/:itemId/increase",
  loginRequired,
  ensureCustomer,
  increaseCartItemQuantity
);
router.patch(
  "/:itemId/decrease",
  loginRequired,
  ensureCustomer,
  decreaseCartItemQuantity
);

router.delete("/:cartId/empty", loginRequired, ensureCustomer, clearCart);
router.delete("/:itemId", loginRequired, ensureCustomer, removeCartItem);
export default router;
