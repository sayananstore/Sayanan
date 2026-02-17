import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "./styles/WishListedProducts.css";
import { useState, useCallback } from "react";
import SizeSelectorModal from "../modals/SizeSelectorModal";
import {Trash2, ShoppingCart} from "lucide-react";

const WishlistProductCard = ({ product }) => {
  const {addItem} = useCart();
  const navigate = useNavigate();
  const { toggle } = useWishlist();
  const [open, setOpen] = useState(false);


  if (!product?.Product) return null;

  const p = product.Product; // ✅ cleaner alias

  const image =
    p.images?.find((i) => i.is_primary)?.image_url ||
    p.images?.[0]?.image_url ||
    "https://via.placeholder.com/300x400?text=Product";

  const goToProduct = () => {
    navigate(`/products/${p.id}`); // ✅ FIXED
  };

const removeFromWishlist = useCallback((e) => {
  e.stopPropagation();
  toggle(p.id);
}, [toggle, p.id]);

const addCartItem = useCallback((e) => {
  e.stopPropagation();
  setOpen(true);  // open modal
}, []);

const handleConfirmSize = async (sizeId) => {
  console.log("here", p.id,sizeId)
  await addItem({  productId: p.id,
  sizeId: sizeId,});
  setOpen(false);
};

  return (
    <div className="wishlist-product">

      {/* IMAGE */}
      <img
        src={image}
        alt={p.name}
        className="wishlist-product-image"
        onClick={goToProduct}
      />

      {/* INFO */}
      <div className="wishlist-product-info">

        <div className="wishlist-product-name">
          {p.name}
        </div>

        <div className="wishlist-product-price">
          ₹ {p.base_price}
        </div>

        {/* ACTIONS */}
        <div className="wishlist-product-actions">

          <button
            className="wishlist-btn-remove"
            onClick={removeFromWishlist}
          >
           <Trash2 />
          </button>

          <button
            className="wishlist-btn-cart"
            onClick={addCartItem}
          >
			<ShoppingCart />
          </button>

        </div>
      </div>
	  <SizeSelectorModal
		open={open}
		productId={p.id}
		onClose={() => setOpen(false)}
		onConfirm={handleConfirmSize}
		/>

    </div>
	
  );
};

export default WishlistProductCard;
