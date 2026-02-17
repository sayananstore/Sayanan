import CartProductCard from "../ProductCards/CartProductCard";
import { useCart } from "../context/CartContext";
import "./styles/CartPage.css";
import DiscountSkeleton from "../sections/DiscountSkeleton";
const CartPage = () => {
  const { items, loading, updateItem, removeItem, total } = useCart();

  const increase = (item) => {
    updateItem(item.id, item.quantity + 1);
  };

  const decrease = (item) => {
    if (item.quantity <= 1) return;
    updateItem(item.id, item.quantity - 1);
  };

  return (
    <div className="cart-page">
      <div className="cart-title">Your Cart</div>

      {loading ? (
        <DiscountSkeleton />
      ) : items.length === 0 ? (
        <div className="cart-empty">
          Your Cart is empty.
        </div>
      ) : (
        <div className="cart-layout">
          {/* LEFT */}
          <div>
            {items.map((item) => (
              <CartProductCard
                key={item.id}
                item={item}
              />
            ))}
          </div>

          {/* RIGHT */}
          <div className="cart-summary">
            <div className="summary-row">
              <span>Total</span>
              <strong>₹ {total}</strong>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
