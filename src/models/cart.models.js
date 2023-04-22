import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    // price: { type: Number, required: true },
  },
  { timestamps: true }
);

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

cartSchema.virtual("total").get(function () {
  return this.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
