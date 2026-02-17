import { createContext, useContext, useEffect, useState } from "react";
import { getWishlist, toggleWishlist } from "../api/wishlist.api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [ids, setIds] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshWishlist = async () => {
    try {
      const res = await getWishlist();

      const products = res?.data?.WishlistItems || [];

      setWishlistProducts(products);

      // derive ids
      setIds(products.map(item => Number(item.Product.id)));

    } catch (err) {
      console.error("Wishlist fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, []);

  /* ✅ OPTIMISTIC TOGGLE */
  const toggle = async (productId) => {

    const id = Number(productId);
    const already = ids.includes(id);

    // optimistic update
    setIds(prev =>
      already
        ? prev.filter(pid => pid !== id)
        : [...prev, id]
    );

    setWishlistProducts(prev =>
      already
        ? prev.filter(item => item.Product.id !== id)
        : prev
    );

    try {
      await toggleWishlist({ product_id: id });
    } catch (err) {

      // rollback safely
      refreshWishlist();

      console.error("Toggle failed:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        ids,
        wishlistProducts,
        toggle,
        loading,
        refreshWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
