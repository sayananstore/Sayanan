import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    shipping_address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "PAID",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "REFUNDED"
      ),
      defaultValue: "PENDING",
    },

    subtotal_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    shipping_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    discount_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    currency: {
      type: DataTypes.CHAR(3),
      defaultValue: "INR",
    },

    payment_status: {
      type: DataTypes.ENUM(
        "PENDING",
        "PAID",
        "FAILED",
        "REFUNDED"
      ),
      defaultValue: "PENDING",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);
