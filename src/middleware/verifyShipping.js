import Shipping from "../models/shipping.model.js";

const verifyShippingMiddleware = async (req, res, next) => {
  const user = req.user;
  try {
    if (!user) {
      return res.status(400).json({
        statuscode: 400,
        message: "Please authenticate to continue",
      });
    }

    const shippingDetails = await Shipping.findOne({ user: user._id });

    if (!shippingDetails) {
      return res.status(404).json({
        statuscode: 404,
        success: false,
        message: "Shipping details not found for the user",
        data: null,
      });
    }

    next();
  } catch (error) {
    console.error("Error in verifyShippingMiddleware:", error);
    return res.status(500).json({
      statuscode: 500,
      message: "Internal Server Error",
    });
  }
};

export default verifyShippingMiddleware;
