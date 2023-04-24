import express from "express";

import { webHook } from "../controllers/stripe.controller.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureCustomer } from "../middleware/roleValidation.js";

const router = express.Router();

router.post("/", webHook);
export default router;
// express.raw({ type: "application/json" })
