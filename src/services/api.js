// src/services/api.js
export const API_BASE_URL = "http://127.0.0.1:8000/api";

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// User API functions
export const userAPI = {
  // Get all users
  getUsers: () => apiCall("/users/"),

  // Authenticate user (login)
  login: (email, password) =>
    apiCall("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // Register new user
  register: (userData) =>
    apiCall("/auth/register/", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  // Check if user exists
  checkUserExists: (email) =>
    apiCall("/auth/check-email/", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};
export const orderAPI = {
  getOrders: () => apiCall("/orders/"),
  createOrder: (order) =>
    apiCall("/orders/", { method: "POST", body: JSON.stringify(order) }),
  updateOrder: (id, order) =>
    apiCall(`/orders/${id}/`, { method: "PUT", body: JSON.stringify(order) }),
  deleteOrder: (id) => apiCall(`/orders/${id}/`, { method: "DELETE" }),
};
