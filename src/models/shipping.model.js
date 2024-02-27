import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const shippingAddressSchema = Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true },
});

const shippingSchema = Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: { type: shippingAddressSchema, required: true },
  estimatedDeliveryDate: { type: Date },
});

const Shipping = mongoose.model("Shipping", shippingSchema);

export default Shipping;
