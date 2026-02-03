import { Payment } from "../models/payment.model.js";
import { Order } from "../models/order.model.js";

/**
 * USER: Initiate Payment (dummy gateway)
 */
export const initiatePayment = async (req, res) => {
  try {
    const { order_id, amount, method } = req.body;

    const order = await Order.findByPk(order_id);
    if (!order || order.user_id !== req.user.id) {
      return res.status(404).json({ message: "Order not found" });
    }

    const payment = await Payment.create({
      user_id: req.user.id,
      order_id,
      amount,
      method,
      gateway: "DUMMY",
      status: "PENDING",
    });

    // Frontend will redirect to gateway in real life
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GATEWAY WEBHOOK (simulate success)
 */
export const paymentWebhook = async (req, res) => {
  try {
    const { payment_id, transaction_id, status } = req.body;

    const payment = await Payment.findByPk(payment_id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = status;
    payment.transaction_id = transaction_id;
    payment.gateway_payload = req.body;
    await payment.save();

    if (status === "SUCCESS") {
      await Order.update(
        { status: "PAID" },
        { where: { id: payment.order_id } }
      );
    }

    res.json({ message: "Webhook processed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * ADMIN: View all payments
 */
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
