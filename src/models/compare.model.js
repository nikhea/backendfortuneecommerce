import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const compareSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const Compare = mongoose.model("Compare", compareSchema);

export default Compare;
