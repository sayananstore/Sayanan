import "./styles/DiscountSection.css";

const DiscountSkeleton = () => {
  return (
    <div className="discount-row">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image shimmer"></div>
          <div className="skeleton-text shimmer"></div>
          <div className="skeleton-text small shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default DiscountSkeleton;
