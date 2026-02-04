import "dotenv/config";
import sequelize from "./config/db.js";
import "./models/index.js";
import app from "./app.js";
import "./models/product.model.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
