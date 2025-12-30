import api from "../api/axios";

/* REAL BACKEND API CALLS */

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getTopProducts = async () => {
  const res = await api.get("/products/top");
  return res.data;
};

export const getProductsByCategory = async (category) => {
  const res = await api.get(`/products/category/${category}`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
