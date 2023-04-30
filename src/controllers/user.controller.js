import Users from "../models/user.models.js";

export const getUsers = async (req, res, next) => {
  try {
    let users = await Users.find().select("-password -__v").populate("cart");
    let response = {
      success: "true",
      statuscode: 200,
      data: users,
      message: "success",
    };
    res.json(response);
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
export const getMe = async (req, res, next) => {
  try {
    let user = await Users.findById(req.user.id).select("-password -v").populate("cart");
    let response = {
      success: "true",
      statuscode: 200,
      data: user,
      message: "success",
    };
    res.json(response);
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

export const getUsersById = async (req, res, next) => {
  const id = req.params.id;
  try {
    let users = await Users.findById(id).select("email role");
    let response = {
      success: "true",
      statuscode: 200,
      data: users,
      message: "success",
    };
    res.json(response);
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

export const removeOneUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    let user = await Users.findByIdAndRemove(id).select("-password");
    // await user.remove();
    let response = {
      success: "true",
      statuscode: 200,
      data: user,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 400,
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};
