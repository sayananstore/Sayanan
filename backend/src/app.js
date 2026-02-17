import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import productImageRoutes from "./routes/productImage.routes.js";
import path from "path";
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

// app.use((req, res, next) => {
//   console.log("INCOMING:", req.method, req.originalUrl);
//   next();
// });
const allowedOrigins = [
  'http://localhost:5173',
   'https://ssl.gstatic.com/_/gsi/_/js/k=gsi.gsi.en_GB.pEg3S-xVUc0.O/am=AACAAAG2BA/d=1/rs=AF0KOtUNxHaItx_MpeYujeYpyPe8oHmlQw/m=credential_button_library',
  'https://ai-interview-client-dfapbpw84-garvit-mathurs-projects.vercel.app',
  'https://ai-interview-client-woad.vercel.app',
  'https://ai-interview-client-garvit-mathurs-projects.vercel.app',
	'https://ai-interview-client-git-main-garvit-mathurs-projects.vercel.app',
	'https://sayanan.vercel.app/'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups"
  );
  res.setHeader(
    "Cross-Origin-Embedder-Policy",
    "unsafe-none"
  );
  next();
});

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
app.use("/api/product/reviews", productReviewRoutes);

export default app;
