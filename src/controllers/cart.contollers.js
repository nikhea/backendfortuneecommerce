import Cart from "../models/cart.models.js";
import Product from "../models/products.models.js";
import User from "../models/user.models.js";

export const createCart = async (req, res) => {
  const { items } = req.body;
  const userId = req.user._id;
  try {
    const product = await Product.findById(items.product);
    const user = await User.findById(userId)
      .populate("wishlist")
      .populate("cart");
    if (!product) {
      return res.status(404).send("Product not found");
    }

    let cart = await Cart.findOne({ user });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === items.product.toString()
      );

      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += items.quantity;
      } else {
        cart.items.push(items);
      }

      await cart.save();
      user.cart.push(cart);
      await user.save();
      return res.status(200).json({
        success: true,
        statuscode: 200,
        data: cart,
        message: "Cart updated successfully",
      });
    } else {
      cart = await Cart.create({ user, items });
      user.cart.push(cart);
      await user.save();
      return res.status(201).json({
        success: true,
        statuscode: 201,
        data: cart,
        message: "Cart created successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCart = async (req, res) => {
  const user = req.user._id;

  try {
    const carts = await Cart.find({ user: user })
      .populate("items.product")
      .populate("user", "-password");
    const transformedData = carts.map(({ _id, items }) => ({
      _id,
      items,
    }));
    const response = {
      success: true,
      statuscode: 200,
      data: carts,
      message: "successfully",
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const increaseCartItemQuantity = async (req, res) => {
  const { itemId, type } = req.params;
  const { quantity } = req.body;
  const user = req.user._id;
  console.log(quantity);
  try {
    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity cannot be less than one" });
    }
    cart.items[itemIndex].quantity = quantity + 1;
    await cart.save();

    return res.status(200).json({
      success: true,
      statuscode: 200,
      data: cart,
      message: "quantity updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const decreaseCartItemQuantity = async (req, res) => {
  const { itemId, type } = req.params;
  const { quantity } = req.body;
  const user = req.user._id;
  console.log(quantity);
  try {
    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity cannot be less than one" });
    }
    cart.items[itemIndex].quantity = quantity - 1;
    await cart.save();

    return res.status(200).json({
      success: true,
      statuscode: 200,
      data: cart,
      message: "quantity updated successfully",
    });
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

export const removeCartItem = async (req, res) => {
  const { itemId } = req.params;
  const user = req.user._id;

  try {
    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const updatedCart = cart.items.filter(
      (item) => item._id.toString() !== itemId
    );

    if (cart.items.length === updatedCart.length) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items = updatedCart;
    await cart.save();

    return res.status(200).json({
      success: true,
      statuscode: 200,
      data: cart,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
