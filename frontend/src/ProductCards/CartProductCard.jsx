import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./styles/CartProductCard.css";
import {Trash2} from "lucide-react"

const CartProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { updateItem, removeItem } = useCart();

  if (!item) return null;

  const image =
    item.Product?.images?.find((i) => i.is_primary)?.image_url ||
    item.Product?.images?.[0]?.image_url ||
    "https://via.placeholder.com/300x400?text=Sayanan";

  const increase = () => {
    updateItem(item.id, item.quantity + 1);
  };

  const decrease = () => {
    if (item.quantity <= 1) return;
    updateItem(item.id, item.quantity - 1);
  };

  const remove = () => {
    removeItem(item.id);
  };

  return (
    <div className="cart-product">
      <img
        src={image}
        alt={item.Product?.name}
        className="cart-product-image"
        onClick={() => navigate(`/products/${item.Product.id}`)}
      />

      <div className="cart-product-info">
        <div className="cart-product-name">
          {item.Product?.name}
        </div>

        <div className="cart-product-meta">
          Size: {item.Size.label}
        </div>

        <div className="cart-product-price">
          ₹ {item.Product?.base_price}
        </div>

        <div className="cart-product-actions">
          <button className="qty-btn" onClick={decrease}>
            -
          </button>

          <div className="qty-value">{item.quantity}</div>

          <button className="qty-btn" onClick={increase}>
            +
          </button>

          <button
            className="cart-remove"
            onClick={remove}
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
