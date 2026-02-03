import {Product} from "../models/product.model.js";
import {SubCategory} from "../models/subcategory.model.js";
import {Category} from "../models/category.model.js";
import {Gender} from "../models/gender.model.js";
import {Size} from "../models/size.model.js";
import {ProductSize} from "../models/productSize.model.js";
import {Review} from "../models/review.model.js";
import {User} from "../models/user.model.js";
import { ProductImage } from "../models/productImage.model.js";
import { Op, fn, col, where} from "sequelize";
/**
 * ADMIN: Create product
 */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      base_price,
	  current_price,
      category_id,
      subcategory_id,
      sizes,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      base_price,
      category_id,
      subcategory_id,
	  current_price
    });
	if (sizes && Array.isArray(sizes)) {
		for (const s of sizes) {
		await ProductSize.create({
			ProductId: product.id,
			SizeId: s.size_id, 
			stock_quantity: s.stock_quantity,
    });
    }
  }

    res.json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    console.error("SQL MESSAGE:", error?.original?.sqlMessage);
    res.status(500).json({
      message: error.message,
      sqlMessage: error?.original?.sqlMessage,
    });
  }
};

/**
 * PUBLIC: Get all active products
 */


export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      gender,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12,
      search
    } = req.query;

    // =========================
    // WHERE CONDITION
    // =========================
    const whereClause = {
      is_active: true
    };

    // Price Filter
    if (minPrice || maxPrice) {
      whereClause.base_price = {};
      if (minPrice) whereClause.base_price[Op.gte] = Number(minPrice);
      if (maxPrice) whereClause.base_price[Op.lte] = Number(maxPrice);
    }

    // 🔍 Search Filter (name + description)
    if (search) {
      whereClause[Op.or] = [
        where(
          fn("LOWER", col("Product.name")),
          { [Op.like]: `%${search.toLowerCase()}%` }
        ),
        where(
          fn("LOWER", col("Product.description")),
          { [Op.like]: `%${search.toLowerCase()}%` }
        ),
		...(isNaN(search)
      ? []
      : [{ id: Number(search) }]),
      ];
    }

    // =========================
    // SORTING
    // =========================
    let order = [["createdAt", "DESC"]];
    if (sort === "price_asc") order = [["base_price", "ASC"]];
    if (sort === "price_desc") order = [["base_price", "DESC"]];

    // =========================
    // PAGINATION
    // =========================
    const offset = (Number(page) - 1) * Number(limit);

    // =========================
    // INCLUDES
    // =========================
    const include = [
      {
        model: ProductImage,
        as: "images",
        attributes: ["image_url", "is_primary", "sort_order"],
        separate: true,
        order: [["sort_order", "ASC"]]
      }
    ];

    if (subcategory) {
      include.push({
        model: SubCategory,
        where: { name: subcategory },
        attributes: ["id", "name"],
        include: [
          {
            model: Category,
            where: category ? { name: category } : undefined,
            attributes: ["id", "name"],
            include: [
              {
                model: Gender,
                where: gender ? { name: gender } : undefined,
                attributes: ["id", "name"]
              }
            ]
          }
        ]
      });
    } else {
      include.push({
        model: Category,
        where: category ? { name: category } : undefined,
        attributes: ["id", "name"],
        include: [
          {
            model: Gender,
            where: gender ? { name: gender } : undefined,
            attributes: ["id", "name"]
          }
        ]
      });
    }

    // =========================
    // QUERY
    // =========================
    const { rows, count } = await Product.findAndCountAll({
      where: whereClause,
      include,
      limit: Number(limit),
      offset,
      order,
      distinct: true
    });

    return res.status(200).json({
      success: true,
      products: rows,
      total: count,
      page: Number(page),
      totalPages: Math.ceil(count / limit)
    });

  } catch (error) {
    console.error("Product Fetch Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};






/**
 * PUBLIC: Get product by ID
 */

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: {
        id,
        is_active: true,
      },
      include: [
        // 🔹 IMAGES
        {
          model: ProductImage,
          as: "images",
          separate: true,
          order: [["sort_order", "ASC"]],
          attributes: ["id","image_url", "is_primary", "sort_order"],
        },

        // 🔹 SUBCATEGORY → CATEGORY → GENDER
        
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

        // 🔹 SIZES + STOCK
        {
          model: Size,
          attributes: ["id", "label"],
          through: {
            model: ProductSize,
            attributes: ["stock_quantity"],
          },
        },

        // 🔹 REVIEWS
        {
          model: Review,
          attributes: ["id", "rating", "comment", "createdAt"],
          include: [
            {
              model: User,
              attributes: ["id", "name"],
            },
          ],
          separate: true,
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    return res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// export const getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findByPk(id, {
//       where: { is_active: true },
//       include: [
// 		    {
//       model: ProductImage,
//       as: "images",
//       separate: true,
//       order: [["sort_order", "ASC"]],
//     },
//         {
//           model: SubCategory,
//           include: [
//             {
//               model: Category,
//               include: [Gender],
//             },
//           ],
//         },
//         {
//           model: Size,
//           through: {
//             model: ProductSize,
//             attributes: ["stock_quantity"],
//           },
//         },
//         {
//           model: Review,
//           include: [{ model: User, attributes: ["name"] }],
//           order: [["createdAt", "DESC"]],
//         },
//       ],
//     });

//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     res.json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


/**
 * ADMIN: Update product
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * ADMIN: Soft delete product
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.is_active = false;
    await product.save();

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
