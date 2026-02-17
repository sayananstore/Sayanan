import api from "./axios"

export const getProductSize = (productId) => api.get(`size/available/${productId}`);

