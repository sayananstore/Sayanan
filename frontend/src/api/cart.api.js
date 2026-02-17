import api from "./axios";

export const getCart = () => {
	return api.get("/cart")}
export const addToCart = (data) => {
	return api.post("/cart/add", data)}
export const updateCartItem = (id, quantity) =>{
  return api.patch(`/cart/item/${id}`, { quantity })}
export const removeCartItem = (id) =>
  api.delete(`/cart/item/${id}`);
