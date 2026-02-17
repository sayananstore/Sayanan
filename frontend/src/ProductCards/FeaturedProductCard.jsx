import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext"; // ✅ ADD
import "./styles/FeaturedProductCard.css";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  // ✅ GLOBAL wishlist
  const { ids, toggle } = useWishlist();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!product) return null;

  /* ✅ derive instead of storing */
  const wishlisted = ids.includes(Number(product.id));

  const images = Array.isArray(product.images) ? product.images : [];

  const image =
    images.find((img) => img.is_primary)?.image_url ||
    images[0]?.image_url ||
    "https://via.placeholder.com/400x500?text=Product";


  /* =====================================
        FETCH RATING + REVIEWS
  ===================================== */

  useEffect(() => {

    let mounted = true;

    const fetchSummary = async () => {
      try {

        const res = await fetch(
          `https://sayanan.vercel.app//api/product/reviews/summary/${product.id}`
        );

        const data = await res.json();

        if (mounted) {
          setSummary(data);
        }

      } catch (err) {
        console.error("Failed to fetch product summary:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchSummary();

    return () => {
      mounted = false;
    };

  }, [product.id]);


  const handleNavigate = () => {
    navigate(`/products/${product.id}`);
  };


  const handleWishlist = (e) => {
    e.stopPropagation();
    toggle(product.id); // ✅ GLOBAL TOGGLE
  };


  return (
    <div className="featured-product-card" onClick={handleNavigate}>

      {/* IMAGE */}
      <div className="featured-product-image-wrapper">

        <img
          src={image}
          alt={product.name}
          className="featured-product-image"
        />

        {/* ✅ Wishlist */}
        <button
          className={`featured-wishlist-btn ${wishlisted ? "wishlisted" : ""}`}
          onClick={handleWishlist}
        >
          {wishlisted ? "♥" : "♡"}
        </button>

      </div>


      {/* CONTENT */}
      <div className="featured-product-content">

        <div className="featured-product-name">
          {product.name}
        </div>

        <div className="featured-product-price">
          ₹ {product.base_price}
        </div>

        {/* ⭐ Rating */}
        {!loading && summary && (
          <div className="featured-product-rating">

            <span className="featured_star_icon">⭐</span>

            <div className="featured-rating-review">

              <span className="featured-stars">
                {summary.rating?.toFixed(1) || "4.5"}
              </span>

              <span className="featured-reviews">
                ({summary.totalReviews || 0})
              </span>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductCard;
