import axios from "axios";
import { API_BASE_URL } from "../config";
import { getAuth } from "firebase/auth";
import "../firebase"; // 🔥 ensure firebase is initialized

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken(true); // 🔥 force refresh
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
