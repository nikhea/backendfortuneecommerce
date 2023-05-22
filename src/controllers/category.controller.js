import Category from "../models/Category.models.js";

export const CreateCategory = async (req, res) => {
  const { name, description, photo } = req.body.categoriesData;
  // console.log(name, description, coverPhoto);
  try {
    const existcategories = Category.find({ name });
    // if (existcategories) {
    //   let response = {
    //     statuscode: 404,
    //     message: `category with ${name} already exists`,
    //   };
    //   return res.json(response);
    // }
    const category = new Category({
      name,
      description,
      coverPhoto: photo.secure_url,
      photo,
    });
    console.log(category);
    await category.save();
    if (category) {
      let response = {
        success: "true",
        statuscode: 201,
        data: category,
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
export const updateOneCategory = async (req, res, next) => {
  const { description, photo } = req.body.categoriesData;
  const name = req.params.name;
  try {
    const category = await Category.findOne({ name });

    if (!category) {
      let response = {
        statuscode: 404,
        data: [],
        error: [error],
        message: "category does not exist",
      };
      return res.json(response);
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      category._id,
      {
        $set: {
          name: req.body.categoriesData.name,
          description,
          coverPhoto: photo.secure_url,
          photo,
          subcategories: category.subcategories,
          products: category.products,
        },
      },
      {
        new: true,
      }
    );
    let response = {
      success: "true",
      statuscode: 200,
      data: updatedCategory,
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

// console.log(category);
// {
//   _id: new ObjectId("6467a3f98c86fcca328da76c"),
//   name: 'computing',
//   description: 'this is computing category',
//   coverPhoto: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80',
//   subcategories: [],
//   products: [],
//   createdAt: 2023-05-19T16:29:45.859Z,
//   updatedAt: 2023-05-19T16:29:45.859Z,
//   __v: 0
// }
