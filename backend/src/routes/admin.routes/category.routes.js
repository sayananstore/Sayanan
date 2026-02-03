import express from "express";
import {
  getCategories,
  createCategory,
} from "../../controllers/admin.controllers/category.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", protect(["ADMIN", "SUPER_ADMIN"]), createCategory); // admin only later

export default router;
