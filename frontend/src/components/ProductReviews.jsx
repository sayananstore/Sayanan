import { useEffect, useState } from "react";
import { getProductReviews } from "../api/review.api";
import "./styles/ProductReviews.css";

const ProductReviews = ({ productId }) => {

  const [reviewsData, setReviewsData] = useState(null);

	useEffect(() => {

    const fetchReviews = async () => {
      try {

        const res = await getProductReviews(productId);
        setReviewsData(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();

  }, [productId]);


  if (!reviewsData) return null;


  return (
    <div className="reviews-wrapper">

      <h2 className="reviews-title">
        Customer Reviews
      </h2>


      {/* SUMMARY */}
      <div className="reviews-summary">

        <div className="rating-big">
          ⭐ {reviewsData.avg_rating}
        </div>

        <div className="total-reviews">
          {reviewsData.rating_count} reviews
        </div>

      </div>



      {/* LIST */}
      <div className="reviews-list">

        {reviewsData.reviews.map((review) => (

          <div key={review.id} className="review-card">

            <div className="review-header">
              <span className="review-user">
                {review.User.name}
              </span>

              <span className="review-rating">
                ⭐ {review.rating}
              </span>
            </div>

            <div className="review-comment">
              {review.comment}
            </div>

          </div>

        ))}

      </div>
    </div>
  );
};

export default ProductReviews;
