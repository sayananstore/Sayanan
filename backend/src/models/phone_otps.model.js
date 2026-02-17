import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const PhoneOtp = sequelize.define("PhoneOtp", {
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
