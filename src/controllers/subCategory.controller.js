import Subcategory from "../models/Subcategory.models.js";
import Category from "../models/Category.models.js";
export const CreateSubCategory = async (req, res) => {
  const { name, category, description } = req.body;
  try {
    const categories = await Category.findOne({ name: category });
    if (!categories) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "Category does not exists",
      };
      return res.json(response);
    }
    if (categories) {
      const subCategory = new Subcategory({
        name,
        category: categories._id,
        description,
      });

      const subcategory = await subCategory.save();
      categories.subcategories.push(subcategory);
      await categories.save();
      let response = {
        success: "true",
        statuscode: 201,
        data: subcategory,
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

export const getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find()
      .populate("category")
      .populate("products");
    let response = {
      success: "true",
      statuscode: 200,
      data: subcategories,
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

export const getOneSubCategories = async (req, res) => {
  const subCategoryName = new RegExp("^" + req.params.name + "$", "i");

  try {
    const subcategories = await Subcategory.findOne({
      name: subCategoryName,
    })
      .populate("category")
      .populate("products");
    let response = {
      success: "true",
      statuscode: 200,
      data: subcategories,
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
export const removeOneSubCategories = async (req, res, next) => {
  const id = req.params.id;
  try {
    let subcategorie = await Subcategory.findByIdAndRemove(id);
    // await subcategorie.remove();
    let response = {
      success: "true",
      statuscode: 200,
      data: subcategorie,
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
