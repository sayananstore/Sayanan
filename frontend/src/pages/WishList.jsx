import WishlistProductCard from "../ProductCards/WishListedProducts.jsx";
import { useWishlist } from "../context/WishlistContext";
import "./styles/WishList.css";
import DiscountSkeleton from "../sections/DiscountSkeleton.jsx";

const Wishlist = () => {

  const { wishlistProducts, loading } = useWishlist();

  return (
    <div className="wishlist-page">
      <div className="wishlist-title">My Wishlist</div>

      {loading ? (
        <DiscountSkeleton />
      ) : wishlistProducts.length === 0 ? (
        <div className="wishlist-empty">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistProducts.map((product) => (
            <WishlistProductCard
              product={product}
              key={product.Product.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
