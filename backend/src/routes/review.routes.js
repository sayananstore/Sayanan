import express from "express";
import {
  addReview,
  getProductReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  getRatingSummary,
} from "../controllers/review.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/product/:productId", getProductReviews);
router.get("/my", protect(), getMyReviews);

router.post("/add", protect(), addReview);
router.put("/:id", protect(), updateReview);
router.delete("/:id", protect(), deleteReview);
router.get("/summary/:productId", getRatingSummary);

export default router;
