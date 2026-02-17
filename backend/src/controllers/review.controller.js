import { Review } from "../models/review.model.js";
import { Product } from "../models/product.model.js";
import Sequelize from "sequelize";

/**
 * POST /api/reviews
 */
export const addReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ProductId, rating, comment } = req.body;

    if (!ProductId || !rating)
      return res.status(400).json({ message: "Missing fields" });

    const existing = await Review.findOne({
      where: { UserId: userId, ProductId },
    });

	const product = await Product.findByPk(ProductId);
	if (!product) {
	  return res.status(404).json({ message: "Product not found" });
	}
    if (existing) {
      return res.status(400).json({ message: "Review already submitted" });
    }

    const review = await Review.create({
      UserId: userId,
      ProductId,
      rating,
      comment,
    });

    /* Update product rating */
    const total = product.avg_rating * product.rating_count + rating;

    product.rating_count += 1;
    product.avg_rating = (total / product.rating_count).toFixed(1);

    await product.save();

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET reviews by product
 */
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
	const product = await Product.findByPk(productId, {
      attributes: ["avg_rating", "rating_count"],
    });

    const reviews = await Review.findAll({
      where: { ProductId: productId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          association: "User",
          attributes: ["id", "name"],
        },
      ],
    });
	if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this product" });
    }
    res.json({
      avg_rating: product.avg_rating,
      rating_count: product.rating_count,
      reviews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET logged in user reviews
 */
export const getMyReviews = async (req, res) => {
  try {
    const userId = req.user.id;

    const reviews = await Review.findAll({
      where: { UserId: userId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Product,
          attributes: ["id", "name"],
        },
      ],
    });
	if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this user" });
    }
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE review
 */
export const updateReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.UserId !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;

    await review.save();

    /* Recalculate product rating */
    const product = await Product.findByPk(review.ProductId);

    const allReviews = await Review.findAll({
      where: { ProductId: product.id },
    });

    const count = allReviews.length;
    const avg =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / (count || 1);

    product.avg_rating = count ? avg.toFixed(1) : 0;
    product.rating_count = count;

    await product.save();

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const review = await Review.findByPk(id);
    if (!review) return res.status(404).json({ message: "Not found" });

    if (review.UserId !== userId)
      return res.status(403).json({ message: "Not allowed" });

    const productId = review.ProductId;

    await review.destroy();

    const product = await Product.findByPk(productId);

    const allReviews = await Review.findAll({
      where: { ProductId: productId },
    });

    const count = allReviews.length;
    const avg =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / (count || 1);

    product.avg_rating = count ? avg.toFixed(1) : 0;
    product.rating_count = count;

    await product.save();

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET rating summary of a product
 */
export const getRatingSummary = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId, {
      attributes: ["avg_rating", "rating_count"],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const stars = await Review.findAll({
      where: { ProductId: productId },
      attributes: [
        "rating",
        [Sequelize.fn("COUNT", Sequelize.col("rating")), "count"],
      ],
      group: ["rating"],
      raw: true,
    });

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    stars.forEach((s) => {
      distribution[s.rating] = Number(s.count);
    });

    res.json({
      rating: Number(product.avg_rating),
      totalReviews: product.rating_count,
      maxRating: 5,
      distribution,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
