import express from "express";
import {
  getOwnerWishlist,
  createOwnerWishlist,
  removeOwnerWishlist,
} from "../controllers/wishlist.controllers.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureCustomer } from "../middleware/roleValidation.js";
const router = express.Router();

router.get("/", loginRequired, ensureCustomer, getOwnerWishlist);

router.post("/", loginRequired, ensureCustomer, createOwnerWishlist);
router.delete("/:id", loginRequired, ensureCustomer, removeOwnerWishlist);

export default router;
