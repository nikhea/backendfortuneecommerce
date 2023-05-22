import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 64,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    coverPhoto: {
      type: String,
      required: false,
    },
    photo: {
      asset_id: {
        type: String,
        required: false,
      },
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
      secure_url: {
        type: String,
        required: false,
      },
      thumbnail_url: {
        type: String,
        required: false,
      },
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
