import express from "express";
import {
  addAddress,
  getMyAddresses,
  updateAddress,
  deleteAddress,
	setDefaultAddress
} from "../controllers/address.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect(), addAddress);
router.get("/", protect(), getMyAddresses);
router.put("/:addressId", protect(), updateAddress);
router.delete("/:addressId", protect(), deleteAddress);
router.put("/:id/default", protect, setDefaultAddress);

export default router;
