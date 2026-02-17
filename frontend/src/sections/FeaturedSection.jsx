import { useEffect, useRef, useState } from "react";
import { getProducts } from "../api/product.api";
import FeaturedProductCard from "../ProductCards/FeaturedProductCard";
import "./styles/FeaturedSection.css";
import DiscountSkeleton from "./DiscountSkeleton"; 

const FeaturedSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const rowRef = useRef(null);

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products.slice(0, 8));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const scroll = (direction) => {
    const container = rowRef.current;
    if (!container) return;

    const scrollAmount = 320; // slightly bigger than card width

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="featured-section">
      <div className="featured-container">

        <div className="featured-title">
          Featured Collection
          <p className="featured-subtitle">
            Hand-picked styles from our artisans, just for you
          </p>
        </div>

        {loading ? (
          <DiscountSkeleton />
        ) : (
          <div className="featured-carousel">

            {/* LEFT BUTTON */}
            <button
              className="scroll-btn left"
              onClick={() => scroll("left")}
            >
              ‹
            </button>

            {/* PRODUCTS */}
            <div className="featured-row" ref={rowRef}>
              {products.map((product) => (
                <div key={product.id} className="featured-item">
                  <FeaturedProductCard product={product} />
                </div>
              ))}
            </div>

            {/* RIGHT BUTTON */}
            <button
              className="scroll-btn right"
              onClick={() => scroll("right")}
            >
              ›
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedSection;
