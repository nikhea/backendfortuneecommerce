import Product from "../models/products.models.js";
import Review from "../models/reviews.models.js";

export const createReview = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      const response = {
        success: true,
        statuscode: 400,
        message: "product does not exist.",
      };
      return res.status(400).json(response);
    }
    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });
    if (existingReview) {
      const response = {
        success: true,
        statuscode: 400,
        message: "Your review for this product exist.",
        // You have already given a review for this product.
      };
      return res.status(400).json(response);
    }
    const review = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    await review.save();
    product.reviews.push(review._id);
    // const totalRating = product.reviews.reduce(
    //   (sum, reviewId) => sum + reviewId.rating,
    //   0
    // );
    const reviewIds = product.reviews.map((reviewId) => reviewId.toString());
    const reviews = await Review.find({ _id: { $in: reviewIds } });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    // product.rating = totalRating / reviews.length;
    product.rating = parseInt(totalRating / product.reviews.length);
    await product.save();
    const response = {
      success: true,
      statuscode: 201,
      data: review,
      message: "Review created successfully.",
    };
    return res.status(201).json(response);
  } catch (error) {
    const response = {
      success: true,
      statuscode: 500,
      message: "An error occurred while creating the review." + error.message,
    };
    res.status(500).json(response);
  }
};

export const getAllReview = async (req, res) => {
  // const reviews = await Review.deleteMany();
  try {
    const reviews = await Review.find()
      .populate("user", "-password")
      .populate("product");
    if (reviews) {
      const response = {
        success: true,
        statuscode: 200,
        data: reviews,
        message: "sucess",
      };
      return res.status(200).json(response);
    } else {
      const response = {
        success: true,
        statuscode: 400,
        data: reviews,
        message: "no reviews yet ",
      };
      return res.status(400).json(response);
    }
  } catch (error) {
    const response = {
      success: true,
      statuscode: 500,
      message: "An error occurred while getting reviews",
    };
    return res.status(500).json(response);
  }
};
export const getProductReview = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "-password"
    );
    if (reviews) {
      const response = {
        success: true,
        statuscode: 200,
        data: reviews,
        message: "sucess",
      };
      res.status(200).json(response);
    } else {
      const response = {
        success: true,
        statuscode: 400,
        data: reviews,
        message: "no review yet for this product.",
      };
      return res.status(400).json(response);
    }
  } catch (error) {
    const response = {
      success: true,
      statuscode: 500,
      message: "An error occurred while getting reviews",
    };
    res.status(500).json(response);
  }
};

export const updateProductReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );
    if (!review) {
      const response = {
        success: true,
        statuscode: 400,
        message: "Review not found.",
      };
      res.status(400).json(response);
    }
    const response = {
      success: true,
      statuscode: 201,
      data: review,
      message: "Review created successfully.",
    };
    return res.status(201).json(response);
  } catch (error) {
    const response = {
      success: true,
      statuscode: 500,
      message: "An error occurred while updating the review.",
    };
    return res.status(500).json(response);
  }
};
export const deleteProductReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    // Remove the review ID from the associated product's reviews array
    const product = await Product.findById(review.product);
    const reviewIndex = product.reviews.indexOf(review._id);
    if (reviewIndex > -1) {
      product.reviews.splice(reviewIndex, 1);
      await product.save();
    }

    res.json({ message: "Review deleted successfully." });
  } catch (error) {
    const response = {
      success: true,
      statuscode: 500,
      message: "An error occurred while deleting the review.",
    };
    res.status(500).json(response);
  }
};
