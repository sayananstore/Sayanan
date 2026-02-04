import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const WishlistItem = sequelize.define(
  "WishlistItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    wishlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    product_variant_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "wishlist_items",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["wishlist_id", "product_id", "product_variant_id"],
      },
    ],
  }
);
