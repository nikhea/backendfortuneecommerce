import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const subcategorySchema = new Schema(
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
      required: false,
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
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;
