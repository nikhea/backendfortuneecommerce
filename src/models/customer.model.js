import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerSchema = Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipping",
    required: true,
  },
});

const customer = mongoose.model("customer", customerSchema);

export default customer;
