import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const SubCategory = sequelize.define("SubCategory", {
  name: DataTypes.STRING,
})