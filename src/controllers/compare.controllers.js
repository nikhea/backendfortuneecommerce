import Compare from "../models/compare.model.js";

export const getOwnerComparelist = async (req, res, next) => {
  const user = req.user.id;
  try {
    let compare = await Compare.find({ user: user })
      .populate("product")
      .populate("user", "-password");
    let response = {
      success: "true",
      statuscode: 200,
      data: compare,
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

export const createOwnerComparelist = async (req, res, next) => {
  const user = req.user.id;
  const { productId } = req.body;
  try {
    let exsitedCompareItem = await Compare.findOne({ product: productId });
    if (exsitedCompareItem) {
      return res.status(409).send("Product already in Compare");
    } else {
      const compare = new Compare({
        user: user,
        product: productId,
      });
      await compare.save();
      let response = {
        success: "true",
        statuscode: 201,
        data: compare,
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

export const removeOwnerComparelist = async (req, res, next) => {
  const id = req.params.id;
  try {
    let compare = await Compare.findByIdAndRemove(id);
    let response = {
      success: "true",
      statuscode: 200,
      data: compare,
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
