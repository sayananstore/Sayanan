import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { s3 } from "../config/s3.js";

export const uploadProductImages = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `products/${req.params.productId}/${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per image
}).array("images", 5); // max 5 images
