import { sequelize } from "../config/db.js";
import { Cart } from "../models/cart.model.js";
import { CartItem } from "../models/cartItem.model.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItem.model.js";

export const placeOrderFromCart = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    /* 1️⃣ Get cart with items */
    const cart = await Cart.findOne({
      where: { user_id: req.user.id },
      include: {
        model: CartItem,
        include: Product,
      },
      transaction: t,
      lock: t.LOCK.UPDATE, // 🔐 prevent race conditions
    });

    if (!cart || cart.CartItems.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: "Cart is empty" });
    }

    /* 2️⃣ Calculate totals (NEVER trust frontend) */
    let subtotal = 0;

    cart.CartItems.forEach((item) => {
      subtotal += item.quantity * item.Product.base_price;
    });

    const shipping_amount = 0;
    const discount_amount = 0;
    const total_amount = subtotal + shipping_amount - discount_amount;

    /* 3️⃣ Create order */
    const order = await Order.create(
      {
        user_id: req.user.id,
        status: "PENDING",
        payment_status: "PENDING",
        subtotal_amount: subtotal,
        shipping_amount,
        discount_amount,
        total_amount,
        currency: "INR",
      },
      { transaction: t }
    );

    /* 4️⃣ Create order items (snapshot) */
    for (const item of cart.CartItems) {
      await OrderItem.create(
        {
          order_id: order.id,
          product_id: item.product_id,
          product_name: item.Product.name,
          quantity: item.quantity,
          unit_price: item.Product.base_price,
          total_price: item.quantity * item.Product.base_price,
        },
        { transaction: t }
      );
    }

    /* 5️⃣ Clear cart */
    await CartItem.destroy({
      where: { cart_id: cart.id },
      transaction: t,
    });

    /* 6️⃣ Commit transaction */
    await t.commit();

    res.status(201).json({
      message: "Order placed successfully",
      order_id: order.id,
    });
  } catch (err) {
    await t.rollback();
    console.error("Order transaction failed:", err);
    res.status(500).json({ message: "Order placement failed" });
  }
};



/**
 * USER: Get my orders
 */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * ADMIN: Get all orders
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
