import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./db/index.js";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import Users from "./routes/user.routes.js";
import Auth from "./routes/auth.routes.js";
import Products from "./routes/product.routes.js";
import SubCategory from "./routes/subCategory.routes.js";
import Category from "./routes/category.routes.js";
import Cart from "./routes/cart.routes.js";
import Wishlist from "./routes/wishlist.routes.js";
import Compare from "./routes/compare.routes.js";
import Order from "./routes/order.routes.js";
import StripeRoute from "./routes/stripe.routes.js";
import StripeHookRoute from "./routes/stripeHook.routes.js";
import Review from "./routes/review.routes.js";
const app = express();
app.get("/", (req, res) => {
  try {
    res.json({
      status: "2000",
      Message: "success",
    });
  } catch (error) {
    let response = {
      statuscode: 400,
      error: error,
      message: "something failed",
    };
    return res.json(response);
  }
});

// Init Middleware
app.use(
  "/api/stripe",
  express.raw({ type: "application/json" }),

  // bodyParser.raw({ type: "*/*" }),
  StripeHookRoute
);

app.use(express.json({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cors());
app.options("*", cors());
app.use(morgan("tiny"));
app.use(errorHandler);
app.use("/api/auth", Auth);
app.use("/api/user", Users);
app.use("/api/products", Products);
app.use("/api/wishlist", Wishlist);
app.use("/api/compare", Compare);
app.use("/api/orders", Order);
// app.use("/api/stripe", StripeRoute);
app.use("/api/category", Category);
app.use("/api/subcategory", SubCategory);
app.use("/api/carts", Cart);
app.use("/api/review", Review);
app.use("/api/payment", StripeRoute);

// api/stripe/webhook

export default app;
