import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* Public routes */
router.get("/", getAllProducts);
router.get("/:id", getProductById);

/* Admin routes */
router.post("/", protect(["ADMIN", "SUPER_ADMIN"]), createProduct);
router.put("/:id", protect(["ADMIN", "SUPER_ADMIN"]), updateProduct);
router.delete("/:id", protect(["ADMIN", "SUPER_ADMIN"]), deleteProduct);

export default router;
