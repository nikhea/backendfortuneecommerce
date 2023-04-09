import express from "express";
import {
  createCart,
  getAllCart,
  clearCart,
  removeCart,
} from "../controllers/cart.contollers.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureAdmin, ensureCustomer } from "../middleware/roleValidation.js";
const router = express.Router();

router.get(
  "/carts",
  // loginRequired,
  getAllCart
);

router.post("/carts", loginRequired, ensureCustomer, createCart);

router.delete("/carts/:cartId", clearCart);
router.delete("/carts/:cartId/empty", removeCart);
export default router;
