// src/config.js
import axios from "axios";

export const BACKEND_BASE_URL = (
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"
).replace(/\/$/, "");

export const API_BASE_URL = `${BACKEND_BASE_URL}/api`;

export const resolveImageUrl = (pathOrUrl) => {
  if (!pathOrUrl) {
    return "/images/products/placeholder.jpg";
  }

  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith("/")
    ? pathOrUrl
    : `/${pathOrUrl}`;

  return `${BACKEND_BASE_URL}${normalizedPath}`;
};

// 🔥 axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Stripe (frontend)
export const STRIPE_PUBLISHABLE_KEY =
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

export default api;
