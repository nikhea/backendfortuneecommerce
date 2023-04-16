import express from "express";
import {
  getOwnerComparelist,
  createOwnerComparelist,
  removeOwnerComparelist,
} from "../controllers/compare.controllers.js";
import { loginRequired } from "../middleware/authtication.js";
import { ensureCustomer } from "../middleware/roleValidation.js";
const router = express.Router();

router.get("/", loginRequired, ensureCustomer, getOwnerComparelist);
router.post("/", loginRequired, ensureCustomer, createOwnerComparelist);
router.delete("/:id", loginRequired, ensureCustomer, removeOwnerComparelist);

export default router;
