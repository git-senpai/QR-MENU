import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://qr-menu-hp3b.onrender.com/api";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  get: async (url) => {
    try {
      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await instance.post(url, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  put: async (url, data) => {
    try {
      const response = await instance.put(url, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  delete: async (url) => {
    try {
      const response = await instance.delete(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
