import { Category } from "../../models/category.model.js";
import { Gender } from "../../models/gender.model.js";

/**
 * GET /api/categories
 */
export const getCategories = async (req, res) => {
  const categories = await Category.findAll({
    include: [Gender],
  });
  res.json(categories);
};

/**
 * POST /api/categories
 */
export const createCategory = async (req, res) => {
  const { name, GenderId } = req.body;

  const category = await Category.create({
    name,
    GenderId,
  });

  res.json(category);
};
