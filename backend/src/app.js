import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import productImageRoutes from "./routes/productImage.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import wishListRoutes from "./routes/wishlist.routes.js";
import CartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import Gender from "./routes/admin.routes/gender.routes.js";
import Size from "./routes/admin.routes/size.routes.js";
import Category from "./routes/admin.routes/category.routes.js";
import SubCategory from "./routes/admin.routes/subCategory.routes.js";
import productReviewRoutes from "./routes/review.routes.js";

const app = express();

/* ===============================
   CORS CONFIGURATION (PRODUCTION READY)
================================= */

const allowedOrigins = [
  "http://localhost:5173",       // Local dev
  "https://sayanan.vercel.app"   // Production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  })
);

// Handle preflight requests
app.options(/.*/, cors());
/* ===============================
   SECURITY HEADERS (For Google Login Popup)
================================= */

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

/* ===============================
   BODY PARSING
================================= */

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

/* ===============================
   STATIC FILES
================================= */

app.use("/uploads", express.static("uploads"));

/* ===============================
   ROUTES
================================= */

app.use("/api/auth", authRoutes);
app.use("/api/products", productImageRoutes);
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
app.use("/api/product/reviews", productReviewRoutes);

/* ===============================
   HEALTH CHECK ROUTE (Optional but Recommended)
================================= */

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ===============================
   ERROR HANDLER (Important for CORS errors)
================================= */

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app;
