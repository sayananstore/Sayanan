import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Category = sequelize.define("Category", {
	name: DataTypes.STRING,
});