import User from "../models/user.models.js";
import { generateJWT } from "../middleware/generateJWT.js";
import { nanoid } from "nanoid";
export const createUser = async (req, res) => {
  const idLength = 8;
  const userID = nanoid(idLength);
  const { email, password, firstname, lastname, role } = req.body;

  try {
    if (!email || !password || !firstname || !lastname) {
      let response = {
        statuscode: 400,
        message: "please enter all fields",
      };
      return res.json(response);
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      let response = {
        statuscode: 400,
        message: "User already exists",
      };
      return res.json(response);
    }

    const user = await User.create({
      email,
      password,
      firstname,
      lastname,
      userID,
      role,
    });
    if (user) {
      const userData = {
        _id: user._id,
        email: user.email,
        userID: user.userID,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        token: generateJWT(user._id),
      };
      let response = {
        statuscode: 201,
        data: userData,
        message: "User Created",
      };
      return res.status(201).json(response);
    } else {
      let response = {
        statuscode: 400,
        message: "something failed",
      };
      return res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    let isMatch = await user.comparePassword(password);
    if (isMatch) {
      const userDate = {
        _id: user._id,
        email: user.email,
        userID: user.userID,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        role: user.role,
        cart: user.cart,
        profile: user.profile,
        token: generateJWT(user._id),
      };
      let response = {
        statuscode: 200,
        data: userDate,
        message: "Login Successful",
      };
      return res.status(response.statuscode).json(response);
    } else {
      let response = {
        statuscode: 400,
        message: "invalid credentials",
      };
      return res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      error: error,
      message: "something failed",
    };
    return res.status(response.statuscode).json(response);
  }
};
