import { Wishlist } from "../models/wishlist.model.js";
import { WishlistItem } from "../models/wishlistItem.model.js";
import { Product } from "../models/product.model.js";
import { ProductImage } from "../models/productImage.model.js";
import { Category } from "../models/category.model.js";
import { Gender } from "../models/gender.model.js";

export const toggleWishlist = async (req, res) => {
  try {
    const { product_id, product_variant_id = null } = req.body;

    // 1️⃣ Get or create wishlist for user
    let wishlist = await Wishlist.findOne({
      where: { user_id: req.user.id },
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user_id: req.user.id,
      });
    }

    // 2️⃣ Check if item already exists
    const existingItem = await WishlistItem.findOne({
      where: {
        wishlist_id: wishlist.id,
        product_id,
        product_variant_id,
      },
    });

    // 3️⃣ Toggle logic
    if (existingItem) {
      await existingItem.destroy();
      return res.json({ wished: false });
    }

    await WishlistItem.create({
      wishlist_id: wishlist.id,
      product_id,
      product_variant_id,
    });

    res.json({ wished: true });
  } catch (err) {
    console.error("Wishlist error:", err);
    res.status(500).json({ message: "Wishlist operation failed" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      where: { user_id: req.user.id },
      include: [
        {
          model: WishlistItem,
          include: [
            {
              model: Product,
              include: [
                {
                  model: ProductImage,
                  as: "images",
                  attributes: [
                    "id",
                    "image_url",
                    "is_primary",
                    "sort_order",
                  ],
                },
                {
                  model: Category,
                  attributes: ["id", "name"],
                  include: [
                    {
                      model: Gender,
                      attributes: ["id", "name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    res.json(wishlist);
  } catch (err) {
    console.error("Get wishlist error:", err);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};


export const getWishlistStatus = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find user's wishlist
    const wishlist = await Wishlist.findOne({
      where: { user_id: req.user.id },
    });

    if (!wishlist) {
      return res.json({ wishlisted: false });
    }

    // Check item
    const item = await WishlistItem.findOne({
      where: {
        wishlist_id: wishlist.id,
        product_id: productId,
      },
    });

    res.json({ wishlisted: !!item });
  } catch (err) {
    console.error("Wishlist status error:", err);
    res.status(500).json({ message: "Failed to check wishlist" });
  }
};


export const getWishlistedProductIds = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({
      where: { user_id: userId },
    });

    if (!wishlist) {
      return res.json({ productIds: [] });
    }

    const items = await WishlistItem.findAll({
      where: { wishlist_id: wishlist.id },
      attributes: ["product_id"],
      raw: true,
    });

    const productIds = items.map((item) => item.product_id);

    res.json({ productIds });
  } catch (err) {
    console.error("Wishlist fetch error:", err);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};