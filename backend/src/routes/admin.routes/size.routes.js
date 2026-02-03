import express from "express";
import {
  getSizes,
  createSize,
  updateProductStocks,
  getAvailableSizesForProduct,
  addMissingSizesToProduct
} from "../../controllers/admin.controllers/size.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getSizes);
router.post("/", protect(["ADMIN", "SUPER_ADMIN"]), createSize); // admin only
router.patch("/updatestocks/:productId",protect(["ADMIN", "SUPER_ADMIN"]),updateProductStocks); // admin only
router.get("/available/:productId", protect(["ADMIN", "SUPER_ADMIN"]), getAvailableSizesForProduct); // admin only
router.post("/addsizes/:productId", protect(["ADMIN", "SUPER_ADMIN"]), addMissingSizesToProduct); // admin only
export default router;
