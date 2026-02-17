import express from "express";
import {
    toggleWishlist,
    getWishlist,
	getWishlistStatus,
	getWishlistedProductIds
} from "../controllers/wishlist.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router();



router.post("/toggle", protect(), toggleWishlist);
router.get("/", protect(), getWishlist);
router.get("/status/:productId", protect(), getWishlistStatus);
router.get("/products", protect(), getWishlistedProductIds);

export default router;