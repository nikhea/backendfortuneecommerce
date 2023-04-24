import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

export const checkOut = async (req, res) => {
  // Set the Access-Control-Allow-Origin header to allow requests from 'https://fortune-ecommerce.vercel.app'
  // res.set(
  //   "Access-Control-Allow-Origin",
  //   "https://fortune-ecommerce.vercel.app"
  // );
  const { cartItem, user } = req.body;
  // const user = req.user;
  let cartId = cartItem[0]._id;
  const cart = cartItem.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          id: item.product._id,
          // name: item.product.name,
          // images: [item.product.coverPhoto],
          status: item.product.status,
          // description: item.product.description,
          // metadata: {
          //   id: item._id,
          // },
        },
        unit_amount: item.product.price,
      },
      quantity: item.quantity,
    };
  });
  const customer = await stripe.customers.create({
    metadata: {
      userId: user._id,
      cart: JSON.stringify(cart),
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
// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
// endpointSecret = process.env.ENDPOINT_SECRET;
export const webHook = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let data;
  let eventType;
  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("webhool");
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

      console.log("customer", customer);
      // console.log("data", data);
      console.log(items.data);
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
