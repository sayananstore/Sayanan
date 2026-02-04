import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Review = sequelize.define("Review", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: DataTypes.TEXT,
});