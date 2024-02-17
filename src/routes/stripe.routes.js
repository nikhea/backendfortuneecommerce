import express from "express";

import { checkOut } from "../controllers/stripe.controller.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureCustomer } from "../middleware/roleValidation.js";

const router = express.Router();

router.post(
  "/create-checkout-session",
  loginRequired,
  ensureCustomer,
  checkOut
);

// router.post("/webhook", express.raw({ type: "application/json" }), webHook);
export default router;
