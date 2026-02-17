import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
//   createRazorpayOrder,
//   verifyPayment
} from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect(), placeOrder);
router.get("/", protect(), getMyOrders);
router.get("/:id", protect(), getOrderById);
router.put("/:id/cancel", protect(), cancelOrder);
// router.post("/create-payment", protect, createRazorpayOrder);
// router.post("/verify-payment", protect, verifyPayment);

export default router;
