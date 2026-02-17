import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ProductCard.css";
import { useWishlist } from "../context/WishlistContext";

import { toggleWishlist } from "../api/wishlist.api";

const ProductCard = ({
	product,
	wishlistedIds = [],
	setWishlistedIds,
}) => {

  const { ids, toggle } = useWishlist();
  const wishlisted = ids.includes(product.id);
  const { refreshWishlist } = useWishlist();
  const navigate = useNavigate();

//   const [wishlisted, setWishlisted] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  if (!product) return null;

  /* ================= IMAGE ================= */

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


  /* =====================================
        NAVIGATION
  ===================================== */

  const handleNavigate = () => {
    navigate(`/products/${product.id}`);
  };



  /* =====================================
        JSX
  ===================================== */

  return (
    <div className="product-card">

      {/* IMAGE */}
      <div className="product-image-wrapper" onClick={handleNavigate}>

        {/* Category Badge */}
        <div className="category-badge">
          {product.category || "PRODUCT"}
        </div>

        <img
          src={image}
          alt={product.name}
          className="product-image"
        />

        {/* Wishlist Button */}
		<button
		className={`wishlist-btn ${wishlisted ? "wishlisted" : ""}`}
		onClick={(e) => {
			e.stopPropagation();
			toggle(product.id);
		}}
		>
		{wishlisted ? "♥" : "♡"}
		</button>

      </div>



      {/* CONTENT */}
      <div className="product-content">

        <div className="product-name" onClick={handleNavigate}>
          {product.name}
        </div>

        <div className="product-subtitle" onClick={handleNavigate}>
          {product.subtitle || "Premium Quality Wear"}
        </div>

        <div className="products-price" onClick={handleNavigate}>
          ₹{product.base_price?.toLocaleString('en-IN')}
        </div>
{/* 
        <button className="add-to-bag-btn" onClick={(e) => {
          e.stopPropagation();
          // Add your add to bag logic here
        }}>
          Add to Bag
        </button> */}

      </div>
		</div>
  );
};

export default ProductCard;


