import { Product } from "../models/product.model.js";
import {Cart} from "../models/cart.model.js";
import {CartItem} from "../models/cartItem.model.js";
import {ProductSize} from "../models/productSize.model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, sizeId, quantity } = req.body;

    const productSize = await ProductSize.findOne({
      where: { product_id: productId, size_id: sizeId },
    });

    if (!productSize)
      return res.status(400).json({ message: "Invalid size selection" });

    if (productSize.stock_quantity < quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) cart = await Cart.create({ user_id: userId });

    const existingItem = await CartItem.findOne({
      where: {
        cart_id: cart.id,
        product_id: productId,
        size_id: sizeId,
      },
    });

    if (existingItem) {
      if (
        existingItem.quantity + quantity >
        productSize.stock_quantity
      ) {
        return res
          .status(400)
          .json({ message: "Stock limit exceeded" });
      }

      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await CartItem.create({
        cart_id: cart.id,
        product_id: productId,
        size_id: sizeId,
        quantity,
      });
    }

    res.json({ message: "Added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const getCart = async (req, res) => {
  const cart = await Cart.findOne({
    where: { user_id: req.user.id },
    include: {
      model: CartItem,
      include: Product,
    },
  });

  res.json(cart);
};

export const updateQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const item = await CartItem.findOne({
      where: { id: itemId },
      include: {
        model: Cart,
        where: { user_id: req.user.id }, // 🔐 OWNERSHIP CHECK
      },
    });

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.quantity = quantity;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await CartItem.findOne({
      where: { id: itemId },
      include: {
        model: Cart,
        where: { user_id: req.user.id }, // 🔐 OWNERSHIP CHECK
      },
    });

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await item.destroy();

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

