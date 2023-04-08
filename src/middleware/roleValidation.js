import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { roles } from "../utils/constants.js";

export const ensureAdmin = async (req, res, next) => {
  if (req.user.role === roles.admin) {
    next();
  } else {
    let response = {
      statuscode: 400,
      message:
        "you are not authorized to perform this action, Only an Admin can perform this action",
    };
    return res.status(response.statuscode).json(response);
  }
};
export const ensureCustomer = async (req, res, next) => {
  if (req.user.role === roles.customer) {
    next();
  } else {
    let response = {
      statuscode: 400,
      message:
        "you are not authorized to perform this action, Only a Customer can perform this action",
    };
    return res.status(response.statuscode).json(response);
  }
};
