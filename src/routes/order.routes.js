import express from "express";
import { getOwnerOrder } from "../controllers/order.controller.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureCustomer } from "../middleware/roleValidation.js";
const router = express.Router();

router.get("/", loginRequired, ensureCustomer, getOwnerOrder);

export default router;
