import sequelize from "../config/db.js";
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItem.model.js";
import { Cart } from "../models/cart.model.js";
import { CartItem } from "../models/cartItem.model.js";
import { Product } from "../models/product.model.js";
import { ProductSize } from "../models/productSize.model.js";
import crypto from "crypto";
// import { razorpay } from "../config/razorpay.js";


export const placeOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const userId = req.user.id;
    const { shipping_address_id } = req.body;

    // 1️⃣ Get user cart with items
    const cart = await Cart.findOne({
      where: { user_id: userId },
      include: [{ model: CartItem }],
      transaction,
      lock: true,
    });

    if (!cart || cart.CartItems.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: "Cart is empty" });
    }

    let subtotal = 0;
    const orderItemsData = [];

    // 2️⃣ Validate stock & calculate totals
    for (const item of cart.CartItems) {
      const product = await Product.findByPk(item.product_id, {
        transaction,
      });

      if (!product) {
        await transaction.rollback();
        return res.status(400).json({ message: "Product not found" });
      }

      const productSize = await ProductSize.findOne({
        where: {
          product_id: item.product_id,
          size_id: item.size_id,
        },
        transaction,
        lock: true,
      });

      if (!productSize || productSize.stock_quantity < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const unitPrice = Number(product.base_price);
      const totalPrice = unitPrice * item.quantity;

      subtotal += totalPrice;

      orderItemsData.push({
        product_id: product.id,
        product_name: product.name,
        size: item.size_id, // you can fetch actual size name if needed
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
      });

      // 3️⃣ Deduct stock
      productSize.stock_quantity -= item.quantity;
      await productSize.save({ transaction });
    }

    const shipping = 0;
    const discount = 0;
    const total = subtotal + shipping - discount;

    // 4️⃣ Create order
    const order = await Order.create(
      {
        user_id: userId,
        shipping_address_id,
        subtotal_amount: subtotal,
        shipping_amount: shipping,
        discount_amount: discount,
        total_amount: total,
        currency: "INR",
        status: "PENDING",
        payment_status: "PENDING",
      },
      { transaction }
    );

    // 5️⃣ Create order items
    for (const item of orderItemsData) {
      await OrderItem.create(
        {
          order_id: order.id,
          ...item,
        },
        { transaction }
      );
    }

    // 6️⃣ Clear cart
    await CartItem.destroy({
      where: { cart_id: cart.id },
      transaction,
    });

    await transaction.commit();

    return res.status(201).json({
      message: "Order placed successfully",
      orderId: order.id,
      totalAmount: total,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Order placement error:", error);
    return res.status(500).json({
      message: "Failed to place order",
    });
  }
};


export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [{ model: OrderItem }],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


export const cancelOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
        user_id: req.user.id,
      },
      include: [{ model: OrderItem }],
      transaction,
      lock: true,
    });

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    if (order.status !== "PENDING") {
      return res.status(400).json({
        message: "Only pending orders can be cancelled",
      });
    }

    // Restore stock
    for (const item of order.OrderItems) {
      await ProductSize.increment("stock_quantity", {
        by: item.quantity,
        where: {
          product_id: item.product_id,
          size_id: item.size,
        },
        transaction,
      });
    }

    order.status = "CANCELLED";
    await order.save({ transaction });

    await transaction.commit();

    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Failed to cancel order" });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
        user_id: req.user.id,
      },
      include: [{ model: OrderItem }],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// export const createRazorpayOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     const order = await Order.findByPk(orderId);

//     if (!order)
//       return res.status(404).json({ message: "Order not found" });

//     if (order.payment_status === "PAID")
//       return res.status(400).json({ message: "Already paid" });

//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(order.total_amount * 100), // paise
//       currency: order.currency,
//       receipt: `order_${order.id}`,
//     });

//     order.razorpay_order_id = razorpayOrder.id;
//     await order.save();

//     res.json({
//       key: process.env.RAZORPAY_KEY_ID,
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Payment init failed" });
//   }
// };
