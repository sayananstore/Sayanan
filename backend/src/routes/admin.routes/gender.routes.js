import express from "express";
import {
  getGender,
  createGender,
} from "../../controllers/admin.controllers/gender.model.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getGender);
router.post("/", protect(["ADMIN", "SUPER_ADMIN"]), createGender); // admin only

export default router;