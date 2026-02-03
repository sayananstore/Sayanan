import { Wishlist } from "../models/wishlist.model.js";
import { WishlistItem } from "../models/wishlistItem.model.js";
import { Product } from "../models/product.model.js";

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
      include: {
        model: WishlistItem,
        include: Product,
      },
    });

    res.json(wishlist);
  } catch (err) {
    console.error("Get wishlist error:", err);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};
