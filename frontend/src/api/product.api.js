import api from "./axios";

export const getProducts = (params = {}) => api.get("/products", { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const getSimilarProducts = (category) => api.get(`/products?category_id=${category}`);
