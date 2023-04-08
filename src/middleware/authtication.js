import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const loginRequired = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        req.user = await User.findById(decoded.id).select("-password");
        return next();
      } else {
        let response = {
          statuscode: 401,
          message: "Not authorized",
        };
        return res.status(response.statuscode).json(response);
      }
    } catch (error) {
      let response = {
        statuscode: 401,
        error: [error],
        message: "Not authorized",
      };
      return res.status(response.statuscode).json(response);
    }
  }
  if (!token) {
    let response = {
      statuscode: 401,
      message: "Not authorized no token",
    };
    return res.status(response.statuscode).json(response);
  }
};
