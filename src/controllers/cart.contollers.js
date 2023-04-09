import Cart from "../models/cart.models.js";

export const createCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user._id;
    const existingCart = await Cart.findOne({ user: userId });

    if (existingCart) {
      // If the cart already exists, check if any of the items have the same product ID
      for (let i = 0; i < items.length; i++) {
        const existingItem = existingCart.items.find(
          (item) => item.product.toString() === items[i].product.toString()
        );
        if (existingItem) {
          // If the item already exists, update its quantity instead of adding a new item
          existingItem.quantity += items[i].quantity;
        } else {
          // Otherwise, add the new item to the cart
          existingCart.items.push(items[i]);
        }
      }

      await existingCart.save();
      const response = {
        success: true,
        statuscode: 200,
        data: existingCart,
        message: "Cart updated successfully",
      };
      res.status(200).json(response);
    } else {
      // If the cart does not exist, create a new cart
      const newCart = await Cart.create({
        user: userId,
        items: items,
      });

      const response = {
        success: true,
        statuscode: 201,
        data: newCart,
        message: "Cart created successfully",
      };
      res.status(201).json(response);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const createCart = async (req, res) => {
//   const { items } = req.body;

//   try {
//     const cart = new Cart({
//       user: req.user._id,
//       items: items,
//     });
//     await cart.save();
//     if (cart) {
//       let response = {
//         success: "true",
//         statuscode: 201,
//         data: cart,
//         message: "success",
//       };
//       res.json(response);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    // Find the cart and remove all items
    const cart = await Cart.findById(cartId);
    cart.items = [];
    await cart.save();

    const response = {
      success: true,
      statuscode: 200,
      data: cart,
      message: "Cart cleared successfully",
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    // Find the cart and remove all items
    const cart = await Cart.findByIdAndRemove(cartId);

    const response = {
      success: true,
      statuscode: 200,
      data: cart,
      message: "Cart cleared successfully",
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
