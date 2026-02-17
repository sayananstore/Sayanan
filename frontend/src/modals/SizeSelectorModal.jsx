import { useEffect, useState } from "react";
import { getProductSize } from "../api/size.api"; // adjust path
import "./styles/SizeSelectorModal.css";

const SizeSelectorModal = ({
  open,
  productId,
  onClose,
  onConfirm,
}) => {
  const [sizes, setSizes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!open) return;

    const load = async () => {
      try {
        const res = await getProductSize(productId);
        setSizes(res.data.existing_sizes || []);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [open, productId]);

  if (!open) return null;

  return (
    <div className="size-modal-overlay" onClick={onClose}>
      <div
        className="size-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Select Size</h3>

        <div className="size-grid">
          {sizes.map((s) => (
            <button
              key={s.id}
              className={`size-btn ${
                selected === s.id ? "active" : ""
              }`}
              onClick={() => setSelected(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          className="size-confirm"
          disabled={!selected}
          onClick={() => onConfirm(selected)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SizeSelectorModal;
