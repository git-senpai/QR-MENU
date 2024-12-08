const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = {
  async get(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },

  async delete(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
};
