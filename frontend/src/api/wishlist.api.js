import api from "./axios";

export const toggleWishlist = (data) => {
  console.log("Toggling wishlist with data:", data);
  return api.post("/wishlist/toggle", data);
};

export const getWishlistStatus = (productId) =>
  api.get(`/wishlist/status/${productId}`);

export const getWishlist = () => {
	return api.get("/wishlist")};

export const getWishlistedProductIds = () => api.get("/wishlist/products");
