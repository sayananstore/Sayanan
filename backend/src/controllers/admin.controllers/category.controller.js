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
  try {
    const { name, GenderId } = req.body;

    if (!name || !GenderId) {
      return res.status(400).json({
        message: "Name and GenderId are required",
      });
    }

    // 🔍 Check if category already exists (case-insensitive)
    const existingCategory = await Category.findOne({
      where: {
        name: {
          [Op.iLike || Op.like]: name.trim(), // iLike for Postgres, like for MySQL
        },
      },
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category with this name already exists",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      GenderId,
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);
    res.status(500).json({
      message: "Failed to create category",
    });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};