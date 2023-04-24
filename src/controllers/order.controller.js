import Order from "../models/orders.models.js";

export const getAllOrders = async (req, res, next) => {
  try {
    let order = await Order.find()
      .populate("items.product")
      .populate("user", "-password")
      .populate("items.product.category");

    let response = {
      success: "true",
      statuscode: 200,
      data: order,
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

export const getOwnerOrder = async (req, res, next) => {
  const user = req.user.id;
  try {
    let order = await Order.find({ user: user })
      .populate("items.product")
      .populate("user", "-password");

    let response = {
      success: "true",
      statuscode: 200,
      data: order,
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
