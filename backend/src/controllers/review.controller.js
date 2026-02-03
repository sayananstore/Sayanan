import {Review} from "../models/review.model.js";
import { Product } from "../models/product.model.js";
/**
 * POST /api/reviews
 */
export const addReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, rating, comment } = req.body;

    const existing = await Review.findOne({
      where: { user_id: userId, product_id: productId },
    });

    if (existing)
      return res
        .status(400)
        .json({ message: "Review already submitted" });

    const review = await Review.create({
      user_id: userId,
      product_id: productId,
      rating,
      comment,
    });

    const product = await Product.findByPk(productId);

    const total =
      product.avg_rating * product.rating_count + rating;

    product.rating_count += 1;
    product.avg_rating = (total / product.rating_count).toFixed(1);

    await product.save();

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
