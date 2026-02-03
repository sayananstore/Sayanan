import express from "express";
import {
addToCart,
getCart,
updateQuantity,
removeFromCart
} from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", protect(), addToCart);
router.get("/", protect(), getCart);
router.patch("/item/:itemId", protect(), updateQuantity);
router.delete("/item/:itemId", protect(), removeFromCart);


export default router;