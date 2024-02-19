import express from "express";
import {
  getOwnerOrder,
  getAllOrders,
  updateOrderDeliveryStatus,
} from "../controllers/order.controller.js";

import { loginRequired } from "../middleware/authtication.js";
import { ensureAdmin, ensureCustomer } from "../middleware/roleValidation.js";
const router = express.Router();

router.get("/", getAllOrders);
router.patch(
  "/:id/status",
  loginRequired,
  ensureAdmin,
  updateOrderDeliveryStatus
);

router.get("/user", loginRequired, ensureCustomer, getOwnerOrder);

export default router;
