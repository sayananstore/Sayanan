import { Product } from "../../models/product.model.js";
import { ProductSize } from "../../models/productSize.model.js";
import { Size } from "../../models/size.model.js";
/**
 * GET /api/sizes
 */
export const getSizes = async (req, res) => {
  const sizes = await Size.findAll();
  res.json(sizes);
};

/**
 * POST /api/sizes
 */
export const createSize = async (req, res) => {
  const { label } = req.body;
  const size = await Size.create({ label });
  res.json(size);
};



export const updateProductStocks = async (req, res) => {
  try {
    const { productId } = req.params;
    const { stocks } = req.body;

    if (!Array.isArray(stocks) || stocks.length === 0) {
      return res.status(400).json({ message: "Stocks payload is required" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    for (const item of stocks) {
      await ProductSize.update(
        { stock_quantity: item.stock_quantity },
        {
          where: {
            ProductId: productId,
            SizeId: item.size_id,
          },
        }
      );
    }

    res.json({
      message: "Stock updated successfully",
    });
  } catch (error) {
    console.error("UPDATE STOCK ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getAvailableSizesForProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const allSizes = await Size.findAll({
      attributes: ["id", "label"],
    });

    const productSizes = await ProductSize.findAll({
      where: { ProductId: productId },
      attributes: ["SizeId"],
    });

    const existingSizeIds = productSizes.map(ps => ps.SizeId);

    const existing_sizes = allSizes.filter(size =>
      existingSizeIds.includes(size.id)
    );

    const missing_sizes = allSizes.filter(size =>
      !existingSizeIds.includes(size.id)
    );

    res.json({
      existing_sizes,
      missing_sizes,
    });
  } catch (error) {
    console.error("AVAILABLE SIZES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


export const addMissingSizesToProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { sizes } = req.body;

    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ message: "Sizes payload is required" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existing = await ProductSize.findAll({
      where: { ProductId: productId },
      attributes: ["SizeId"],
    });

    const existingSizeIds = existing.map(e => e.SizeId);

    const duplicates = sizes.filter(s =>
      existingSizeIds.includes(s.size_id)
    );

    if (duplicates.length > 0) {
      return res.status(409).json({
        message: "Some sizes already exist for this product",
        duplicate_size_ids: duplicates.map(d => d.size_id),
      });
    }

    const newRows = sizes.map(s => ({
      ProductId: productId,
      SizeId: s.size_id,
      stock_quantity: s.stock_quantity,
    }));

    await ProductSize.bulkCreate(newRows);

    res.status(201).json({
      message: "Sizes added successfully",
      added_sizes: sizes,
    });
  } catch (error) {
    console.error("ADD SIZES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
