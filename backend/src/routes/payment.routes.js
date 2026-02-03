import express from "express";
import {
  initiatePayment,
  paymentWebhook,
  getAllPayments,
} from "../controllers/payment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/initiate", protect(), initiatePayment);
router.post("/webhook", paymentWebhook); // no auth
router.get("/admin", protect(["ADMIN", "SUPER_ADMIN"]), getAllPayments);

export default router;
