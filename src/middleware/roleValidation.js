import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { roles } from "../utils/constants.js";
import Cart from "../models/cart.models.js";
// import Users from "../models/user.models.js";

export const ensureAdmin = async (req, res, next) => {
  if (!req.user) {
    let response = {
      statuscode: 400,
      message: "become authorized to continue",
    };
    return res.status(400).json(response);
  }
  if (req.user.role === roles.admin) {
    next();
  } else {
    let response = {
      statuscode: 400,
      message:
        "you are not authorized to perform this action, Only an Admin can perform this action",
    };
    return res.status(400).json(response);
  }
};
export const ensureCustomer = async (req, res, next) => {
  if (!req.user) {
    let response = {
      statuscode: 400,
      message: "become authorized to continue",
    };
    return res.status(400).json(response);
  }
  if (req.user.role === roles.customer) {
    next();
  } else {
    let response = {
      statuscode: 400,
      message:
        "you are not authorized to perform this action, Only a Customer can perform this action",
    };
    return res.status(400).json(response);
  }
};
export const ensureIsOwner = async (req, res, next) => {
  if (!req.user) {
    let response = {
      statuscode: 400,
      message: "become authorized to continue",
    };
    return res.status(400).json(response);
  }
  let isOwner = await Cart.findById(req.user.id).select("-password -v");

  if (req.user._id === isOwner._id) {
    next();
  } else {
    let response = {
      statuscode: 400,
      message:
        "you are not authorized to perform this action, Only a Customer can perform this action",
    };
    return res.status(400).json(response);
  }
};
