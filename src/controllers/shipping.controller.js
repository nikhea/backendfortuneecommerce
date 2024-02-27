import shipping from "../models/shipping.model.js";

const findShippingByUserId = async (req, res) => {
  const user = req.user;
  try {
    const shippingDetails = await shipping
      .findOne({ user: user._id })
      .populate({
        path: "user",
        select: "email firstname lastname role",
      });

    if (!shippingDetails) {
      return res.status(404).json({
        statuscode: 404,
        success: false,
        message: "Shipping details not found for the user",
        data: null,
      });
    }

    return res.status(200).json({
      statuscode: 200,
      success: true,
      message: "Shipping details found",
      data: shippingDetails,
    });
  } catch (error) {
    return res.status(500).json({
      statuscode: 500,
      success: false,
      message: "Internal server error",
      data: null,
      error: error,
    });
  }
};
const createShipping = async (req, res, next) => {
  const user = req.user;
  const { country, state, city, street, postalCode, phone } = req.body;
  try {
    if (!country || !state || !city || !street || !postalCode || !phone) {
      let response = {
        statuscode: 400,
        success: false,
        message: "please enter all fields",
        data: [],
      };
      return res.json(response);
    }
    const userExist = await shipping.findOne({ user: user._id });
    if (userExist)
      return res
        .status(400)
        .json({ message: "shipping details already exist" });

    const newShipping = new shipping({
      user: user._id,
      address: {
        country,
        state,
        city,
        street,
        postalCode,
        phone,
      },
    });
    const savedShipping = await newShipping.save();
    if (!savedShipping)
      return res.status(400).json({
        statuscode: 400,
        success: false,
        message: "shipping details could not be saved",
        data: savedShipping,
      });

    return res.status(201).json({
      statuscode: 201,
      success: true,
      message: "shipping details saved",
      data: savedShipping,
    });
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: `something failed ${error}`,
    };
    return res.status(400).json(response);
  }
};

const updateShipping = async (req, res, next) => {
  const user = req.user;
  const { country, state, city, street, postalCode, phone } = req.body;
  try {
    const existingShipping = await shipping.findOne({ user: user._id });
    if (!existingShipping) {
      return res.status(404).json({ message: "Shipping details not found" });
    }
    existingShipping.address = {
      country: country || existingShipping.address.country,
      state: state || existingShipping.address.state,
      city: city || existingShipping.address.city,
      street: street || existingShipping.address.street,
      postalCode: postalCode || existingShipping.address.postalCode,
      phone: phone || existingShipping.address.phone,
    };

    const updatedShipping = await existingShipping.save();
    return res.status(200).json({
      statuscode: 200,
      success: true,
      message: "Shipping details updated",
      data: updatedShipping,
    });
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: `Something failed: ${error}`,
    };
    return res.status(400).json(response);
  }
};

export { findShippingByUserId, createShipping, updateShipping };
