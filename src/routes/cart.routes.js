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

router.get("/carts", loginRequired, ensureCustomer, getAllCart);

router.post("/carts", loginRequired, ensureCustomer, createCart);
router.patch(
  "/carts/:itemId/increase",
  loginRequired,
  ensureCustomer,
  increaseCartItemQuantity
);
router.patch(
  "/carts/:itemId/decrease",
  loginRequired,
  ensureCustomer,
  decreaseCartItemQuantity
);

router.delete("/carts/:cartId/empty", loginRequired, ensureCustomer, clearCart);
router.delete("/carts/:itemId", loginRequired, ensureCustomer, removeCartItem);
export default router;
