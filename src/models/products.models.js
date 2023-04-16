import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const availabilitySchema = new Schema(
  {
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 64,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
    },
    priceSymbol: {
      type: String,
      required: false,
      default: "$",
    },
    currency: {
      type: String,
      required: false,
      default: "USD",
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photos: [],
    coverPhoto: {
      type: String,
      required: true,
    },
    specifications: [
      {
        name: String,
        value: String,
      },
    ],
    availability: availabilitySchema,
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    status: {
      type: String,
      enum: ["in stock", "out of stock", "being restocked"],
      default: "in stock",
    },
    rating: {
      type: Number,
      // required: true,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    // tags: [String],
    // relatedProducts: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Product",
    //   },
    // ],
    discounts: [
      {
        code: String,
        discount: Number,
      },
    ],
    features: [String],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
