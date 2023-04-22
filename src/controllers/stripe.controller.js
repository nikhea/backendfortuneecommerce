import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

export const checkOut = async (req, res) => {
  const { cartItem } = req.body;
  const user = req.user;

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
  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkoutSuccess`,
    cancel_url: `${process.env.CLIENT_URL}/shoppingCart`,
  });

  res.send({ url: session.url });
};

// line_items: [
//   {
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: "T-shirt",
//       },
//       unit_amount: 2000,
//     },
//     quantity: 1,
//   },
//   {
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: "T-shirt",
//       },
//       unit_amount: 2000,
//     },
//     quantity: 1,
//   },
// ],
