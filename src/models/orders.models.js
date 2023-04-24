import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderItemSchema = new mongoose.Schema(
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
    },
  },
  { timestamps: true }
);

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerId: { type: String },
    paymentIntentId: { type: String },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    deliveryStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

// status: {
//   type: String,
//   enum: ["pending", "processing", "shipped", "delivered"],
//   default: "pending",
// },
// shippingAddress: {
//   street: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   country: {
//     type: String,
//     required: true,
//   },
//   zip: {
//     type: String,
//     required: true,
//   },
// },
// paymentMethod: {
//   type: String,
//   enum: ["credit card", "debit card", "paypal"],
//   required: true,
// },
// paymentResult: {
//   id: String,
//   status: String,
//   update_time: String,
//   email_address: String,
// },
