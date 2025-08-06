import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Add token to all requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== AUTH ==========
export const registerUser = (data) => api.post("/users/register", data);
export const loginUser = (data) => api.post("/users/login", data);
export const getUserDetails = () => api.get("/users/me");

// ========== CUSTOMERS ==========
export const getCustomers = () => api.get("/customers");
export const createCustomer = (data) => api.post("/customers", data);

// ========== PRODUCTS ==========
export const getProducts = () => api.get("/products");
export const createProduct = (data) => api.post("/products", data);

export default api;
