import express from "express";
import {
  getMyOrders,
  getAllOrders,
  placeOrderFromCart
} from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/my", protect(), getMyOrders);
router.get("/admin", protect(["ADMIN", "SUPER_ADMIN"]), getAllOrders);
router.post("/from-cart", protect(), placeOrderFromCart);

export default router;
