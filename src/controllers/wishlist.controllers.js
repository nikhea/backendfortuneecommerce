import Wishlist from "../models/wishlist.model.js";

export const getOwnerWishlist = async (req, res, next) => {
  const user = req.user.id;
  try {
    let wishlist = await Wishlist.find({ user: user })
      .populate("product")
      .populate("user", "-password");
    let response = {
      success: "true",
      statuscode: 200,
      data: wishlist,
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

export const createOwnerWishlist = async (req, res, next) => {
  const user = req.user.id;
  const { productId } = req.body;
  try {
    let exsitedwishlistItem = await Wishlist.findOne({ product: productId });
    if (exsitedwishlistItem) {
      return res.status(409).send("Product already in wishlist");
    } else {
      const wishlist = new Wishlist({
        user: user,
        product: productId,
      });
      await wishlist.save();
      let response = {
        success: "true",
        statuscode: 201,
        data: wishlist,
        message: "success",
      };
      res.json(response);
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

export const removeOwnerWishlist = async (req, res, next) => {
  const id = req.params.id;
  try {
    let wishlist = await Wishlist.findByIdAndRemove(id);
    let response = {
      success: "true",
      statuscode: 200,
      data: wishlist,
      message: "removed successfully",
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
