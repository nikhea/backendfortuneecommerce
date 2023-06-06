import Subcategory from "../models/Subcategory.models.js";
import Category from "../models/Category.models.js";
export const CreateSubCategory = async (req, res) => {
  const { name, category, description, photo } = req.body.subCategoriesData;
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
        coverPhoto: photo.secure_url,
        photo,
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
      return res.json(response);
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
export const getAllSubCategoriesPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 2;
  const searchName = req.query;
  try {
    let query = Subcategory.find();
    let countQuery = Subcategory.find();
    if (searchName) {
      query = query.where("name", new RegExp(searchName, "i"));
    }
    const count = await countQuery.countDocuments();
    const totalPages = Math.ceil(count / pageSize);
    const skip = (page - 1) * pageSize;

    const subcategories = await query
      .populate("category")
      .populate("products")
      .skip(skip)
      .limit(pageSize);
    let response = {
      success: "true",
      statuscode: 200,
      data: subcategories,
      message: "success",
      page: page,
      count: count,
      totalPages: totalPages,
      pageSize: pageSize,
    };
    return res.json(response);
  } catch (error) {
    let response = {
      statuscode: 500,
      data: [],
      error: [error],
      message: "something failed",
    };
    console.log(error.message);
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
export const updateOneSubCategory = async (req, res, next) => {
  const { description, photo, category } = req.body.subCategoriesData;
  const name = req.params.name;
  try {
    const subCategory = await Subcategory.findOne({ name });

    if (!subCategory) {
      let response = {
        statuscode: 404,
        data: [],
        error: [error],
        message: "category does not exist",
      };
      return res.json(response);
    }
    const updatedSubCategory = await Subcategory.findByIdAndUpdate(
      subCategory._id,
      {
        $set: {
          name: req.body.subCategoriesData.name,
          description,
          coverPhoto: photo.secure_url,
          photo,
          category: subCategory.category,
          products: subCategory.products,
        },
      },
      {
        new: true,
      }
    );
    let response = {
      success: "true",
      statuscode: 200,
      data: updatedSubCategory,
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

// export const getAllSubCategoriesPagination = async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const pageSize = parseInt(req.query.pageSize) || 2;
//   const searchName = req.query;
//   console.log(searchName);
//   try {
//     let query = Subcategory.find();
//     let countQuery = Subcategory.find();
//     if (searchName) {
//       query = query.where("name", new RegExp(searchName, "i"));
//     }
//     const count = await countQuery.countDocuments();
//     const totalPages = Math.ceil(count / pageSize);
//     const skip = (page - 1) * pageSize;

//     const subcategories = await query
//       .populate("category")
//       .populate("products")
//       .skip(skip)
//       .limit(pageSize);
//     let response = {
//       success: "true",
//       statuscode: 200,
//       data: subcategories,
//       message: "success",
//       page: page,
//       count: count,
//       totalPages: totalPages,
//       pageSize: pageSize,
//     };
//     return res.json(response);
//   } catch (error) {
//     let response = {
//       statuscode: 500,
//       data: [],
//       error: [error],
//       message: "something failed",
//     };
//     console.log(error.message);
//     return res.json(response);
//   }
// };
