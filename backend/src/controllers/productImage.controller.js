import { Product } from "../models/product.model.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";
import { ProductImage } from "../models/productImage.model.js";

export const deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const image = await ProductImage.findByPk(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Extract S3 key from URL
    const key = image.image_url.split(".amazonaws.com/")[1];

    // Delete from S3
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
    );

    // Delete from DB
    await image.destroy();

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadImages = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = req.files.map((file) => ({
      product_id: productId,
      image_url: file.location, // 🔴 S3 public URL
    }));

    await ProductImage.bulkCreate(images);

    res.status(201).json({
      message: "Images uploaded to S3 successfully",
      images,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const setPrimaryImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const image = await ProductImage.findByPk(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Reset all images of product
    await ProductImage.update(
      { is_primary: false },
      { where: { product_id: image.product_id } }
    );

    // Set selected image as primary
    image.is_primary = true;
    await image.save();

    res.json({ message: "Primary image set successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateImageOrder = async (req, res) => {
  try {
    const { productId } = req.params;
    const { imageOrder } = req.body; 
    // example: [5, 2, 9, 1]

    for (let i = 0; i < imageOrder.length; i++) {
      await ProductImage.update(
        { sort_order: i },
        { where: { id: imageOrder[i], product_id: productId } }
      );
    }

    res.json({ message: "Image order updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
