import * as dotenv from "dotenv";
dotenv.config();
import Order from "../models/orders.models.js";
import Cart from "../models/cart.models.js";
// import Customer from "../models/customer.model.js";
// import Shipping from "../models/shipping.model.js";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

const endpointSecret = process.env.ENDPOINT_SECRET;

export const checkOut = async (req, res) => {
  const { cartItem, user } = req.body;
  if (!cartItem || !user) {
    let response = {
      statuscode: 400,
      error: [],
      message: "something failed",
    };
    return res.json(response);
  }
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
    // phone_number_collection: {
    //   enabled: true,
    // },
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkoutSuccess`,
    cancel_url: `${process.env.CLIENT_URL}/shoppingCart`,
  });

  res.send({ url: session.url });
};

// const createOrFindCustomer = async (customer) => {
//   const user = customer.metadata.userId;

//   try {
//     const existingCustomer = await Customer.findOne({ user });
//     const address = await Shipping.findOne({ user });
//     if (existingCustomer) {
//       return existingCustomer._id;
//     } else {
//       const newCustomer = new Customer({
//         user,
//         address,
//       });
//       const savedCustomer = await newCustomer.save();
//       return savedCustomer._id;
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const createOrder = async (customer, data) => {
  const userId = customer.metadata.userId;
  const cartItems = JSON.parse(customer.metadata.items);
  try {
    const newOrder = new Order({
      user: userId,
      // customer: customerId,
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
    const order = await newOrder.save();
    console.log(order, "orders");
    if (order) {
      // const cartItems = await Cart.find({ user: userId });
      await Cart.deleteMany({ user: userId });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const webHook = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  const payload = request.body;
  let data;
  let eventType;
  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = request.body.data.object;
    eventType = request.body.type;
  }

  if (eventType === "checkout.session.completed") {
    try {
      const items = await stripe.checkout.sessions.listLineItems(data.id);
      const customer = await stripe.customers.retrieve(data.customer);

      // const customerId = await createOrFindCustomer(customer);
      // console.log(customerId);
      // if (customerId) {
      createOrder(customer, data);
      // }
    } catch (error) {
      console.log(error);
    }
  }
  response.send().end();
};
