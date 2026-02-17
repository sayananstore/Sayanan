import { Product } from "../models/product.model.js";
import {Cart} from "../models/cart.model.js";
import {CartItem} from "../models/cartItem.model.js";
import {ProductSize} from "../models/productSize.model.js";
import { Size } from "../models/size.model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, sizeId, quantity = 1 } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    /* ===============================
       VERIFY PRODUCT
    =============================== */
    const product = await Product.findByPk(productId);
    if (!product || !product.is_active) {
      return res.status(401).json({ message: "Product not found" });
    }

	if (!sizeId){
		return res.status(401).json({message:"Please select a size"})
	}

    /* ===============================
       VERIFY SIZE + STOCK
    =============================== */
    const productSize = await ProductSize.findOne({
      where: { productId: productId, sizeId: sizeId },
    });

    if (!productSize) {
      return res.status(400).json({ message: "Invalid size selection" });
    }

    if (productSize.stock_quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    /* ===============================
       GET OR CREATE CART
    =============================== */
    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) cart = await Cart.create({ user_id: userId });

    /* ===============================
       CHECK EXISTING ITEM
    =============================== */
    const existingItem = await CartItem.findOne({
      where: {
        cart_id: cart.id,
        product_id: productId,
        size_id: sizeId,
      },
    });

    if (existingItem) {
      const newQty = existingItem.quantity + quantity;

      if (newQty > productSize.stock_quantity) {
        return res.status(400).json({ message: "Stock limit exceeded" });
      }

      existingItem.quantity = newQty;
      await existingItem.save();
    } else {
      await CartItem.create({
        cart_id: cart.id,
        product_id: productId,
        size_id: sizeId,
        quantity,
      });
    }

    res.json({ message: "Added to cart successfully" });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { user_id: req.user.id },
      include: [
        {
          model: CartItem,
          include: [
            {
              model: Product,
              include: [
                {
                  association: "images",
                  attributes: ["image_url", "is_primary"],
                },
              ],
            },
            {
              model: Size,
              attributes: ["id", "label"],
            },
          ],
        },
      ],
    });

    if (!cart) return res.json({ items: [] });

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
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
      include: [
        {
          model: Cart,
          where: { user_id: req.user.id },
        },
      ],
    });

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    /* ===============================
       CHECK STOCK
    =============================== */
    const productSize = await ProductSize.findOne({
      where: {
        productId: item.product_id,
        sizeId: item.size_id,
      },
    });

    if (quantity > productSize.stock_quantity) {
      return res.status(400).json({ message: "Stock exceeded" });
    }

    item.quantity = quantity;
    await item.save();

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await CartItem.findOne({
      where: { id: itemId },
      include: [
        {
          model: Cart,
          where: { user_id: req.user.id },
        },
      ],
    });

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await item.destroy();

    res.json({ message: "Item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


