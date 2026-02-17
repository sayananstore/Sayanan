import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  firebase_uid: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  is_verified:{
	type: DataTypes.BOOLEAN,
	defaultValue: false,
  },
  phone: {
	type: DataTypes.STRING(15),
	unique: true,
  },
  is_phone_verified: {
	type: DataTypes.BOOLEAN,
	defaultValue: false,
  },
   role: {
    type: DataTypes.ENUM("USER", "ADMIN", "SUPER_ADMIN"),
    defaultValue: "USER",
  },
  photo_url: {
  type: DataTypes.STRING,
  allowNull: true,
},
});
