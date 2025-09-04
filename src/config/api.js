const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://e-commerce-backend-production-5d11.up.railway.app";

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export default API_BASE_URL;
