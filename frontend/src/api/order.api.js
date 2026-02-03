import api from "./axios";

export const placeOrder = (data) =>
  api.post("/orders/from-cart", data);

export const getMyOrders = () => api.get("/orders/my");
