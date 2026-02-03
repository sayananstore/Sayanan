import express from "express";
import {
  getSubCategories,
  createSubCategory,
} from "../../controllers/admin.controllers/subCategory.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getSubCategories);
router.post("/", protect(["ADMIN", "SUPER_ADMIN"]), createSubCategory); // admin only later

export default router;
