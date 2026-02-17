import api from "./axios";

export const getProductReviews = (productId) =>
  api.get(`product/reviews/product/${productId}`);

