import express from "express";
import {
  getOwnerWishlist,
  createOwnerWishlist,
  removeOwnerWishlist,
  getAllWishlist,
} from "../controllers/wishlist.controllers.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureCustomer } from "../middleware/roleValidation.js";
import { filitersModels } from "../middleware/infinitPagination.js";
import Wishlist from "../models/wishlist.model.js";

const router = express.Router();

router.get(
  "/",
  loginRequired,
  ensureCustomer,
  // filitersModels(Wishlist),
  getOwnerWishlist
);

router.post("/", loginRequired, ensureCustomer, createOwnerWishlist);
router.delete("/:id", loginRequired, ensureCustomer, removeOwnerWishlist);

export default router;
