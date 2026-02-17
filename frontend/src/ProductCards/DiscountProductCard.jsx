import "./styles/DiscountProductCard.css";
import { useNavigate } from "react-router-dom";


const DiscountProductCard = ({ product }) => {
  if (!product) return null;
  const navigate = useNavigate();
  const image =
    product.images?.[0]?.image_url ||
    "https://via.placeholder.com/500x650";

  const discountPercent = Math.round(
    ((product.base_price - product.current_price) / product.base_price) * 100
  );

  return (
    <div className="product-card" onClick={() => navigate(`/api/product/${product.id}`)}>
      <div className="product-image-wrapper">
        <img
          src={image}
          alt={product.name}
          className="product-image"
        />

        <div className="sale-badge">
          {discountPercent}% OFF
        </div>
      </div>

      <div className="product-info">

        <div className="product-title">
          {product.name}
        </div>

        <div className="product-price">
          <span className="old-price">
            ₹{Number(product.base_price)}
          </span>

          <span className="new-price">
            ₹{product.current_price}
          </span>
        </div>

      </div>
    </div>
  );
};

export default DiscountProductCard;
