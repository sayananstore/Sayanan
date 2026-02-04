import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Payment = sequelize.define(
  "Payment",
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

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING,
      defaultValue: "INR",
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "SUCCESS",
        "FAILED",
        "REFUNDED"
      ),
      defaultValue: "PENDING",
    },

    method: {
      type: DataTypes.STRING, // UPI, CARD, NETBANKING
    },

    gateway: {
      type: DataTypes.STRING, // Razorpay, Stripe
    },

    transaction_id: {
      type: DataTypes.STRING,
    },

    gateway_payload: {
      type: DataTypes.JSON,
    },
  },
  { tableName: "payments" }
);
