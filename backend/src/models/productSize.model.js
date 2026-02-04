import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const ProductSize = sequelize.define("ProductSize", {
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});