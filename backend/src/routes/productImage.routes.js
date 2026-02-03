import express from "express";
import { uploadImages,deleteImage,setPrimaryImage,updateImageOrder } from "../controllers/productImage.controller.js";
import { uploadProductImages } from "../middlewares/upload.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* ADMIN: Upload images for product */
router.post(
  "/:productId/images",
  protect(["ADMIN", "SUPER_ADMIN"]),
  uploadProductImages,
  uploadImages
);

router.delete(
  "/images/:imageId",
  protect(["ADMIN", "SUPER_ADMIN"]),
  deleteImage
);

router.patch(
  "/images/:imageId/primary",
  protect(["ADMIN", "SUPER_ADMIN"]),
  setPrimaryImage
);

router.patch(
  "/:productId/images/order",
  protect(["ADMIN", "SUPER_ADMIN"]),
  updateImageOrder
);


export default router;
