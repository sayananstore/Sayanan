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

// User ↔ Cart
User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

// User ↔ Wishlist
User.hasOne(Wishlist, { foreignKey: "user_id" });
Wishlist.belongsTo(User, { foreignKey: "user_id" });

// User ↔ Orders
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

// User ↔ Payments
User.hasMany(Payment, { foreignKey: "user_id" });
Payment.belongsTo(User, { foreignKey: "user_id" });

/* =======================
   CART RELATIONS
======================= */

// Cart ↔ CartItems
Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

/* =======================
   WISHLIST RELATIONS
======================= */

// Wishlist ↔ WishlistItems
Wishlist.hasMany(WishlistItem, { foreignKey: "wishlist_id" });
WishlistItem.belongsTo(Wishlist, { foreignKey: "wishlist_id" });

/* =======================
   ORDER RELATIONS
======================= */

// Order ↔ OrderItems
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

// Order ↔ Payments
Order.hasMany(Payment, { foreignKey: "order_id" });
Payment.belongsTo(Order, { foreignKey: "order_id" });

/* =======================
   PRODUCT RELATIONS
======================= */

// Product ↔ Images
Product.hasMany(ProductImage, {
  foreignKey: "product_id",
  as: "images",
});
ProductImage.belongsTo(Product, {
  foreignKey: "product_id",
});

/* =======================
   WISHLIST ITEM ↔ PRODUCT
======================= */

Product.hasMany(WishlistItem, {
  foreignKey: "product_id",
});

WishlistItem.belongsTo(Product, {
  foreignKey: "product_id",
});


/* =======================
   CART ITEM ↔ PRODUCT
======================= */

Product.hasMany(CartItem, {
  foreignKey: "product_id",
});

CartItem.belongsTo(Product, {
  foreignKey: "product_id",
});


User.hasMany(Address, { foreignKey: "user_id" });
Address.belongsTo(User, { foreignKey: "user_id" });

/* Order ↔ Address */
Address.hasMany(Order, { foreignKey: "shipping_address_id" });
Order.belongsTo(Address, { foreignKey: "shipping_address_id" });


Gender.hasMany(Category);
Category.belongsTo(Gender, { foreignKey: "GenderId" });

Category.hasMany(SubCategory);
SubCategory.belongsTo(Category, { foreignKey: "CategoryId" });

// SubCategory.hasMany(Product);
Product.belongsTo(SubCategory, {
  foreignKey: "subcategory_id",
});
Product.belongsTo(Category, {
  foreignKey: "category_id",
});
Product.belongsToMany(Size, { through: ProductSize });
Size.belongsToMany(Product, { through: ProductSize });

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

Category.hasMany(Product, { foreignKey: "category_id" });
SubCategory.hasMany(Product, { foreignKey: "subcategory_id" });

Product.belongsTo(Category, { foreignKey: "category_id" });
Product.belongsTo(SubCategory, { foreignKey: "subcategory_id" });
