import Order from "../models/orders.models.js";

export const getAllOrders = async (req, res, next) => {
  const { user } = req;
  try {
    let order = await Order.find()
      .populate({
        path: "user",
        select: "-password",
        populate: {
          path: "shipping",
        },
      })
      .populate("items.product")
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

export const updateOrderDeliveryStatus = async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    if (!status) {
      let response = {
        success: false,
        statuscode: 404,
        message: "delivery status is required",
      };
      return res.status(404).json(response);
    }
    let order = await Order.findById(id);

    if (!order) {
      let response = {
        success: false,
        statuscode: 404,
        message: "order not found",
      };
      return res.status(404).json(response);
    }
    order.deliveryStatus = status;
    await order.save();

    let response = {
      success: "true",
      statuscode: 200,
      // data: order,
      message: "success",
    };
    return res.status(200).json(response);
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

export const OrderStats = async (req, res, next) => {
  try {
    const orders = await Order.find();
    let totalSum = 0;
    let pendingCount = 0;
    let processingCount = 0;
    let shippedCount = 0;
    let deliveredCount = 0;

    orders.forEach((order) => {
      totalSum += order.total;
      switch (order.deliveryStatus) {
        case "pending":
          pendingCount++;
          break;
        case "processing":
          processingCount++;
          break;
        case "shipped":
          shippedCount++;
          break;
        case "delivered":
          deliveredCount++;
          break;
        default:
          break;
      }
    });

    const stats = {
      totalSum,
      totalLengthByStatus: {
        orders: orders.length,
        pending: pendingCount,
        processing: processingCount,
        shipped: shippedCount,
        delivered: deliveredCount,
      },
    };

    let response = {
      success: true,
      statuscode: 200,
      data: stats,
      message: "success",
    };
    return res.status(200).json(response);
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
