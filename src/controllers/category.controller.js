import Category from "../models/Category.models.js";

export const CreateCategory = async (req, res) => {
  const { name, description, coverPhoto } = req.body;
  try {
    const category = new Category({
      name,
      description,
      coverPhoto,
    });
    await category.save();
    // res.status(201).json(category);
    if (category) {
      let response = {
        success: "true",
        statuscode: 201,
        data: category,
        message: "success",
      };
      res.json(response);
    }
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

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("subcategories")
      .populate("products");
    let response = {
      success: "true",
      statuscode: 200,
      data: categories,
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
    res.status(500).json({ message: "Server error" });
  }
};
export const getOneCategories = async (req, res) => {
  const categoryName = new RegExp("^" + req.params.name + "$", "i");
  try {
    const categories = await Category.findOne({ name: categoryName })
      .populate("subcategories")
      .populate("products");
    let response = {
      success: "true",
      statuscode: 200,
      data: categories,
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
    res.status(500).json({ message: "Server error" });
  }
};

export const removeOneCategories = async (req, res, next) => {
  const id = req.params.id;
  try {
    let categorie = await Category.findByIdAndRemove(id);
    // await categorie.remove();
    let response = {
      success: "true",
      statuscode: 200,
      data: categorie,
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
