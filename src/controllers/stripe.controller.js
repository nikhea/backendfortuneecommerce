import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import Order from "../models/orders.models.js";
import Cart from "../models/cart.models.js";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

export const checkOut = async (req, res) => {
  // Set the Access-Control-Allow-Origin header to allow requests from 'https://fortune-ecommerce.vercel.app'
  res.set(
    "Access-Control-Allow-Origin",
    "https://fortune-ecommerce.vercel.app"
  );

  const { cartItem, user } = req.body;
  // const user = req.user;
  let cartId = cartItem[0]._id;
  const cart = cartItem.map((item) => {
    return {
      product: item.product._id,
      quantity: item.quantity,
    };
  });
  const customer = await stripe.customers.create({
    metadata: {
      userId: user._id,
      items: JSON.stringify(cart),
      cartId: cartId,
    },
  });
  const line_items = cartItem.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          images: [item.product.coverPhoto],
          description: item.product.description,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkoutSuccess`,
    cancel_url: `${process.env.CLIENT_URL}/shoppingCart`,
  });

  res.send({ url: session.url });
};

const createOrder = async (res, customer, items, data) => {
  const userId = customer.metadata.userId;
  const cartItems = JSON.parse(customer.metadata.items);
  const newOrder = new Order({
    user: userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    subtotal: data.amount_subtotal,
    total: data.amount_subtotal,
    shipping: data.customer_details,
    paymentStatus: data.payment_status,
    deliveryStatus: data.delivery_Status,
    status: data.status,
    items: cartItems,
  });

  try {
    const order = await newOrder.save();
    if (order) {
      const cartItems = await Cart.find({ user: userId });
      await Cart.deleteMany({ user: userId });
      let response = {
        success: "true",
        statuscode: 200,
        data: order,
        message: "success",
      };
      res.json(response);
    } else {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "something failed",
      };
      return res.json(response);
    }
  } catch (error) {
    console.log(error);
  }
};

// let endpointSecret;
const endpointSecret = process.env.ENDPOINT_SECRET;
export const webHook = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let data;
  let eventType;
  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      // console.log("webhool");
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      console.log(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = request.body.data.object;
    eventType = request.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    try {
      const items = await stripe.checkout.sessions.listLineItems(data.id);
      const customer = await stripe.customers.retrieve(data.customer);

      createOrder(response, customer, items, data);
    } catch (error) {
      console.log(error);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
};
// stripe.customers
//   .retrieve(data.customer)
//   .then((customer) => {
//     console.log("customer", customer);
//     console.log("data", data);
//     console.log(items);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// switch (event.type) {
//   case "payment_intent.succeeded":
//     const paymentIntentSucceeded = event.data.object;
//     // Then define and call a function to handle the event payment_intent.succeeded
//     break;
//   // ... handle other event types
//   default:
//     console.log(`Unhandled event type ${event.type}`);
// }
// const userId = JSON.parse(customer.metadata.userId);
// const cartItems = JSON.parse(customer.metadata.items);
// let p = {
//   user: userId,
//   items: cartItems,
//   customerId: data.customer,
//   paymentIntentId: data.payment_intent,
//   subtotal: data.amount_subtotal,
//   total: data.amount_subtotal,
//   shipping: data.customer_details,
//   paymentStatus: data.payment_status,
//   status: data.status,
// };
// console.log(p);

// console.log("customer", customer);
// console.log("data", data);
// console.log(items.data);
// let p = {
// user: userId,
// items: cartItems,
//   customerId: data.customer,
//   paymentIntentId: data.payment_intent,
//   subtotal: data.amount_subtotal,
//   total: data.amount_subtotal,
//   shipping: data.customer_details,
//   paymentStatus: data.payment_status,
//   deliveryStatus: data.delivery_Status,
// };
// console.log(p);
// Set the Access-Control-Allow-Origin header to allow requests from 'https://fortune-ecommerce.vercel.app'
// res.set(
//   "Access-Control-Allow-Origin",
//   "https://fortune-ecommerce.vercel.app"
// );
