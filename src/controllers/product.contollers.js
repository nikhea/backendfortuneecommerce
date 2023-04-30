import Products from "../models/products.models.js";
import Category from "../models/Category.models.js";
import Subcategory from "../models/Subcategory.models.js";
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      sold,
      photos,
      coverPhoto,
      specifications,
      availability,
      category,
      subcategory,
      review,
      features,
      rating,
    } = req.body;

    const exsitCategory = await Category.findOne({ name: category });
    const exsitSubCategory = await Subcategory.findOne({ name: subcategory });
    const Product = new Products({
      name,
      description,
      price,
      quantity,
      sold,
      photos,
      coverPhoto,
      specifications,
      availability,
      category: exsitCategory._id,
      subcategory: exsitSubCategory._id,
      review,
      features,
      rating,
    });
    const product = await Product.save();
    exsitSubCategory.products.push(product);
    exsitCategory.products.push(product);
    await exsitSubCategory.save();
    await exsitCategory.save();
    let response = {
      success: "true",
      statuscode: 201,
      data: product,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 500,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find()
      .populate("category")
      .populate("subcategory");
    let response = {
      success: "true",
      statuscode: 200,
      data: products,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 500,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};

export const getOneProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Products.findById(id)
      .populate("category")
      .populate("subcategory");
    if (!product) return res.status(404).json({ message: "Product not found" });
    let response = {
      success: "true",
      statuscode: 200,
      data: product,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductByName = async (req, res, next) => {
  const p = new RegExp("^" + req.params.name + "$", "i");

  try {
    const product = await Products.findOne({ name: p })
      .populate("category")
      .populate("subcategory")
      .populate("reviews");
    let response = {
      success: "true",
      statuscode: 200,
      data: product,
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

export const updateOneProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Products.findByIdAndUpdate(id);
    if (!product) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "Product not found",
      };
      return res.json(response);
    }
    const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    let response = {
      success: "true",
      statuscode: 200,
      data: updatedProduct,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 500,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};

export const removeOneProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Products.findByIdAndRemove(id);
    // if (!product) return res.status(404).json({ message: "Product not found" });
    // await product.remove();
    let response = {
      success: "true",
      statuscode: 200,
      data: product,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 500,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};
