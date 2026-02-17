import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import QuantitySelector from "../components/QuantitySelector";
import { getProductById } from "../api/product.api";
import {
  toggleWishlist,
  getWishlistStatus,
} from "../api/wishlist.api";
import ProductReviews from "../components/ProductReviews";
import SimilarProducts from "../components/SimilarProducts";
import "./styles/ProductDetail.css";
import FeaturedSection from "../sections/FeaturedSection";


const ProductDetail = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const [wishlisted, setWishlisted] = useState(false);
  const [toggling, setToggling] = useState(false);



  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data))
      .catch(console.error);
  }, [id]);



  /* ================= FETCH WISHLIST ================= */

  useEffect(() => {

    const fetchWishlist = async () => {
      try {

        const res = await getWishlistStatus(id);
        setWishlisted(res.data.wishlisted);

      } catch (err) {
        console.error("Wishlist status failed:", err);
      }
    };

    fetchWishlist();

  }, [id]);



  /* ================= TOGGLE ================= */

  const handleToggleWishlist = async () => {

    if (toggling) return;

    setToggling(true);

    const previous = wishlisted;

    // optimistic
    setWishlisted(!previous);

    try {

      const res = await toggleWishlist({
        product_id: id,
      });

      setWishlisted(res.data.wished);

    } catch (err) {

      console.error(err);
      setWishlisted(previous);

    } finally {
      setToggling(false);
    }
  };



  if (!product) return null;



  return (
    <div className="product-detail">

      <div className="product-detail-grid">

        {/* LEFT */}
        <div className="gallery-wrapper">
          <ImageGallery images={product.images} />
        </div>



        {/* RIGHT */}
        <div className="product-info">

          <div className="product-title">
            {product.name}
          </div>

          <div className="product-price">
            ₹{product.base_price}
          </div>


          <div className="product-description">
            {product.description}
          </div>


          <div className="product-divider" />


          {/* Quantity */}
          <div className="product-qty-label">
            Select Quantity
          </div>

          <QuantitySelector value={qty} setValue={setQty} />


          {/* ACTIONS */}
          <div className="product-actions">

            <button className="btn-primary">
              Add to Cart
            </button>


            <button
              className={`btn-wishlist ${
                wishlisted ? "wishlisted" : ""
              }`}
              onClick={handleToggleWishlist}
              disabled={toggling}
            >
              {wishlisted ? "♥ Wishlisted" : "♡ Wishlist"}
            </button>

          </div>

        </div>
      </div>
      <ProductReviews productId={id} />
      <SimilarProducts category={product.category_id} />
    </div>
  );
};

export default ProductDetail;
