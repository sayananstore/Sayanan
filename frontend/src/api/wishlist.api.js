import api from "./axios";

export const toggleWishlist = (data) =>
  api.post("/wishlist/toggle", data);

export const getWishlist = () => api.get("/wishlist");
