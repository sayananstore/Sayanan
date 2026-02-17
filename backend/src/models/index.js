// src/models/index.js
import { User } from "./user.model.js";
import { Order } from "./order.model.js";
import { OrderItem } from "./orderItem.model.js";
import { Payment } from "./payment.model.js";
import { Product } from "./product.model.js";
import { ProductImage } from "./productImage.model.js";
import { Cart } from "./cart.model.js";
import { CartItem } from "./cartItem.model.js";
import { Wishlist } from "./wishlist.model.js";
import { WishlistItem } from "./wishlistItem.model.js";
import { Address } from "./address.model.js";
import { Category } from "./category.model.js";
import { SubCategory } from "./subcategory.model.js";
import { Gender } from "./gender.model.js";
import { Size } from "./size.model.js";
import { ProductSize } from "./productSize.model.js";
import { Review } from "./review.model.js";

/* =======================
   USER RELATIONS
======================= */

User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Wishlist, { foreignKey: "user_id" });
Wishlist.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Payment, { foreignKey: "user_id" });
Payment.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Address, { foreignKey: "user_id" });
Address.belongsTo(User, { foreignKey: "user_id" });

/* =======================
   CART
======================= */

Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

/* =======================
   WISHLIST
======================= */

Wishlist.hasMany(WishlistItem, { foreignKey: "wishlist_id" });
WishlistItem.belongsTo(Wishlist, { foreignKey: "wishlist_id" });

/* =======================
   ORDER
======================= */

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Order.hasMany(Payment, { foreignKey: "order_id" });
Payment.belongsTo(Order, { foreignKey: "order_id" });

/* =======================
   ORDER ↔ ADDRESS
======================= */

Address.hasMany(Order, { foreignKey: "shipping_address_id" });
Order.belongsTo(Address, { foreignKey: "shipping_address_id" });

/* =======================
   PRODUCT
======================= */

Product.hasMany(ProductImage, {
  foreignKey: "product_id",
  as: "images",
});
ProductImage.belongsTo(Product, { foreignKey: "product_id" });

Product.hasMany(WishlistItem, { foreignKey: "product_id" });
WishlistItem.belongsTo(Product, { foreignKey: "product_id" });

Product.hasMany(CartItem, { foreignKey: "product_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

/* =======================
   CATEGORY TREE
======================= */

Gender.hasMany(Category, { foreignKey: "GenderId" });
Category.belongsTo(Gender, { foreignKey: "GenderId" });

Category.hasMany(SubCategory, { foreignKey: "CategoryId" });
SubCategory.belongsTo(Category, { foreignKey: "CategoryId" });

Category.hasMany(Product, { foreignKey: "category_id" });
SubCategory.hasMany(Product, { foreignKey: "subcategory_id" });

Product.belongsTo(Category, { foreignKey: "category_id" });
Product.belongsTo(SubCategory, { foreignKey: "subcategory_id" });

/* =======================
   SIZE
======================= */

Product.belongsToMany(Size, { through: ProductSize });
Size.belongsToMany(Product, { through: ProductSize });

/* =======================
   REVIEW ⭐⭐⭐⭐⭐
======================= */

Product.hasMany(Review, { foreignKey: "ProductId" });
Review.belongsTo(Product, { foreignKey: "ProductId" });

User.hasMany(Review, { foreignKey: "UserId" });
Review.belongsTo(User, {
  foreignKey: "UserId"   // important for include
});


CartItem.belongsTo(Size, { foreignKey: "size_id" });
Size.hasMany(CartItem, { foreignKey: "size_id" });