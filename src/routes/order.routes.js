import express from "express";
import {
  getOwnerOrder,
  getAllOrders,
} from "../controllers/order.controller.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureAdmin, ensureCustomer } from "../middleware/roleValidation.js";
const router = express.Router();

router.get(
  "/",
  //  loginRequired, ensureAdmin,
  getAllOrders
);

router.get("/user", loginRequired, ensureCustomer, getOwnerOrder);

export default router;
