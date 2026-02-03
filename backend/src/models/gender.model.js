import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Gender = sequelize.define("Gender", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
