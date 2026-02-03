import express from "express";
import {
    toggleWishlist,
    getWishlist
} from "../controllers/wishlist.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router();



router.post("/toggle", protect(), toggleWishlist);
router.get("/", protect(), getWishlist);

export default router;