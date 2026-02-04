import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Size = sequelize.define("Size", {
  label: {
    type: DataTypes.STRING,
    unique: true,
  },
});