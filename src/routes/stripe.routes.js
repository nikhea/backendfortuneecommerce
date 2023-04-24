import express from "express";
import { checkOut, webHook } from "../controllers/stripe.controller.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureCustomer } from "../middleware/roleValidation.js";
import bodyParser from "body-parser";
import express from "express";
const router = express.Router();
const app = express();

router.post(
  "/create-checkout-session",
  loginRequired,
  ensureCustomer,
  checkOut
);

app.use(bodyParser.raw({ type: "application/json" }));
router.post("/webhook", express.raw({ type: "application/json" }), webHook);
export default router;
