import Products from "../models/products.models.js";
import Category from "../models/Category.models.js";
import Subcategory from "../models/Subcategory.models.js";
import { slugifyURL } from "../middleware/slugifyurl.js";
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      shortDescription,
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
      status,
      rating,
      bestSeller,
      featured,
      newArrival,
      specialOffer,
    } = req.body;
    console.log(req.body);
    const slugURl = `${name} ${category} ${subcategory}`;
    const exsitCategory = await Category.findOne({ name: category });
    const exsitSubCategory = await Subcategory.findOne({ name: subcategory });
    const Product = new Products({
      name,
      description,
      shortDescription,
      slug: slugifyURL(slugURl),
      status,
      price,
      quantity,
      sold,
      photos,
      displayPhoto: coverPhoto,
      coverPhoto: coverPhoto.secure_url,
      specifications,
      availability,
      category: exsitCategory._id,
      subcategory: exsitSubCategory._id,
      review,
      features,
      rating,
      bestSeller,
      featured,
      newArrival,
      specialOffer,
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
export const getAllProduct = async (req, res) => {
  try {
    const products = await Products.find()
      .populate("category")
      .populate("subcategory");
    const extractedData = products.map((item) => ({
      _id: item._id,
      slug: item.slug,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      status: item.status,
      coverPhoto: item.coverPhoto,
      categoryName: item.category.name,
      subcategoryName: item.subcategory.name,
      rating: item.rating,
    }));
    let response = {
      success: "true",
      statuscode: 200,
      data: extractedData,
      message: "success",
    };
    return res.json(response);
  } catch (error) {
    let response = {
      statuscode: 500,
      data: [],
      error: [error],
      message: "something failed !!!!!!!",
    };
    return res.json(response);
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = res.paginatedResults;
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
  //   const products = await Products.find()
  //   .populate("category")
  //   .populate("subcategory");
  // let response = {
  //   success: "true",
  //   statuscode: 200,
  //   data: products,
  //   message: "success",
  // };
  // res.json(response);
};

export const getProductsByTage = async (req, res) => {
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

export const getProductBySlug = async (req, res, next) => {
  // const p = new RegExp("^" + req.params.name + "$", "i");
  const slug = req.params.slug;
  try {
    const product = await Products.findOne({ slug })
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
  const {
    name,
    description,
    shortDescription,
    price,
    quantity,
    sold,
    photos,
    coverPhoto,
    specifications,
    availability,
    displayPhoto,
    category,
    subcategory,
    reviews,
    features,
    status,
    rating,
    bestSeller,
    featured,
    newArrival,
    specialOffer,
  } = req.body.productData;
  const slugURl = `${name} ${category} ${subcategory}`;
  try {
    const product = await Products.findById(id);
    const categories = await Category.findOne({ name: category });
    const SubCategory = await Subcategory.findOne({ name: subcategory });
    if (!product) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "Product not found",
      };
      return res.json(response);
    }
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          slug: slugifyURL(slugURl),
          description,
          shortDescription,
          price,
          quantity,
          sold,
          displayPhoto,
          photos,
          coverPhoto: coverPhoto.secure_url,
          specifications,
          availability,
          category: categories._id,
          subcategory: SubCategory._id,
          reviews: product.reviews,
          features,
          status,
          rating,
          bestSeller,
          featured,
          newArrival,
          specialOffer,
        },
      },
      {
        new: true,
      }
    );
    let response = {
      success: "true",
      statuscode: 200,
      data: updatedProduct,
      message: "success",
    };
    return res.json(response);
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

export const removeProductImage = async (req, res, next) => {
  const productId = req.params.id;
  const assetId = req.params.assetId;
  try {
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // console.log(product.photos);
    product.photos = product.photos.filter(
      (image) => image.asset_id !== assetId
    );
    // product.photos = [];
    await product.save();
    res.json({ message: "Image removed successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// https://res.cloudinary.com/djkqaqoj3/image/upload/v1686020635/photos-productImages-undefined-1686020113705/vlphmhinpimxrlm2xndi.jpg
// https://res.cloudinary.com/djkqaqoj3/image/upload/v1686020679/photos-productImages-undefined-1686020113705/g2jy441kxfvhh2rmzvn9.jpg
