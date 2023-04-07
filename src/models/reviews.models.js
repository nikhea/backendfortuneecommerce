import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
});

const review = mongoose.model("Product", reviewSchema);

export default review;
