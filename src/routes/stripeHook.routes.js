import express from "express";

import { webHook } from "../controllers/stripe.controller.js";

const router = express.Router();

router.post("/webhook", webHook);
export default router;
// express.raw({ type: "application/json" })
