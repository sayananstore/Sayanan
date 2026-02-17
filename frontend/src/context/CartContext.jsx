import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCart as apiGetCart,
  addToCart as apiAddToCart,
  updateCartItem,
  removeCartItem,
} from "../api/cart.api";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH CART
  =============================== */
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await apiGetCart();
      setItems(res.data.CartItems || []);
    } catch (err) {
      console.error("Cart fetch error:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     ADD ITEM
  =============================== */
  const addItem = async (data) => {
    await apiAddToCart(data);
    await fetchCart();
  };

  /* ===============================
     UPDATE QUANTITY
  =============================== */
  const updateItem = async (id, quantity) => {
    await updateCartItem(id, quantity);

    // Update locally instead of refetching
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  /* ===============================
     REMOVE ITEM
  =============================== */
  const removeItem = async (id) => {
    await removeCartItem(id);

    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  /* ===============================
     LOAD ON MOUNT
  =============================== */
  useEffect(() => {
    fetchCart();
  }, []);

  /* ===============================
     TOTAL CALCULATION
  =============================== */
  const total = items.reduce(
    (sum, i) => sum + i.quantity * i.Product.base_price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        total,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
