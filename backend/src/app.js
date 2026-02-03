import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import productImageRoutes from "./routes/productImage.routes.js";
import path from "path";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import wishListRoutes from "./routes/wishList.routes.js";
import CartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import Gender from "./routes/admin.routes/gender.routes.js";
import Size from "./routes/admin.routes/size.routes.js";
import Category from "./routes/admin.routes/category.routes.js";
import SubCategory from "./routes/admin.routes/subCategory.routes.js";


const app = express();

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

app.use("/api/products", productImageRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/gender", Gender);
app.use("/api/size", Size);
app.use("/api/category", Category);
app.use("/api/subcategory", SubCategory);

export default app;
