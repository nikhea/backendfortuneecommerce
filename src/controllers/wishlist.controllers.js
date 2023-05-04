import Wishlist from "../models/wishlist.model.js";
import User from "../models/user.models.js";

export const getAllWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.find()
      .populate("product")
      .populate("user", "-password");

    // const transformedData = wishlist.map(({ _id, product }) => ({
    //   _id,
    //   product,
    // }));
    // const wishlist = res.paginatedResults;

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
export const getOwnerWishlist = async (req, res, next) => {
  const user = req.user.id;
  // const { page = 1, pageSize = 2 } = req.query;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 2;
  try {
    const count = await Wishlist.countDocuments({ user: user });
    const totalPages = Math.ceil(count / pageSize);
    const skip = (page - 1) * pageSize;

    let wishlist = await Wishlist.find({ user: user })
      .populate("product")
      .populate("user", "-password")
      .skip(skip)
      .limit(pageSize);

    const transformedData = wishlist.map(({ _id, product }) => ({
      _id,
      product,
    }));

    let response = {
      success: "true",
      statuscode: 200,
      data: transformedData,
      message: "success",
      page: page,
      count: count,
      totalPages: totalPages,
      pageSize: pageSize,
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
  const userId = req.user.id;
  const { productId } = req.body;
  try {
    const user = await User.findById(userId)
      .populate("wishlist")
      .populate("cart");
    const exist = user.wishlist.some(
      (item) => item.product.toString() === productId
    );
    console.log(exist);
    if (exist) {
      let response = {
        success: "true",
        statuscode: 409,
        message: "Product already in wishlist",
      };
      res.json(response);
    } else {
      const wishlist = new Wishlist({
        user: userId,
        product: productId,
      });
      await wishlist.save();
      user.wishlist.push(wishlist);
      await user.save();
      let response = {
        success: "true",
        statuscode: 201,
        data: wishlist,
        message: "product added to wishlist",
      };
      res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: `something failed ${error}`,
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
      message: "product removed successfully",
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

// const user = req.user.id;
// try {
//   let wishlist = await Wishlist.find({ user: user })
//     .populate("product")
//     .populate("user", "-password");

//   const transformedData = wishlist.map(({ _id, product }) => ({
//     _id,
//     product,
//   }));
//   // const wishlist = res.paginatedResults;

//   let response = {
//     success: "true",
//     statuscode: 200,
//     data: transformedData,
//     message: "success",
//   };
//   res.json(response);
// } catch (error) {
//   let response = {
//     statuscode: 400,
//     data: [],
//     error: [error],
//     message: "something failed",
//   };
//   return res.json(response);
// }
// export const createOwnerWishlist = async (req, res, next) => {
//   const user = req.user.id;
//   const { productId } = req.body;
//   try {
//     let exsitedwishlistItem = await Wishlist.findOne({ product: productId });
//     if (exsitedwishlistItem) {
//       let response = {
//         success: "true",
//         statuscode: 409,
//         // data: wishlist,
//         message: "Product already in wishlist",
//       };
//       res.json(response);
//     } else {
//       const wishlist = new Wishlist({
//         user: user,
//         product: productId,
//       });
//       await wishlist.save();
//       let response = {
//         success: "true",
//         statuscode: 201,
//         data: wishlist,
//         message: "product added to wishlist",
//       };
//       res.json(response);
//     }
//   } catch (error) {
//     let response = {
//       statuscode: 400,
//       data: [],
//       error: [error],
//       message: "something failed",
//     };
//     return res.json(response);
//   }
// };
