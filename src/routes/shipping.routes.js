import express from "express";
import {
  findShippingByUserId,
  createShipping,
  updateShipping,
} from "../controllers/shipping.controller.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureCustomer } from "../middleware/roleValidation.js";

const router = express.Router();

router.get("/", loginRequired, ensureCustomer, findShippingByUserId);
router.post("/", loginRequired, ensureCustomer, createShipping);
router.patch("/", loginRequired, ensureCustomer, updateShipping);

export default router;
