import { Category } from "../../models/category.model.js";
import { SubCategory } from "../../models/subcategory.model.js";

/**
 * GET /api/subcategories
 */
export const getSubCategories = async (req, res) => {
  const subcategories = await SubCategory.findAll({
    include: [Category],
  });
  res.json(subcategories);
};

/**
 * POST /api/subcategories
 */
export const createSubCategory = async (req, res) => {
  const { name, category_id } = req.body;

  const subcategory = await SubCategory.create({
    name,
    category_id,
  });

  res.json(subcategory);
};
