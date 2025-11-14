// src/services/api.js
export const API_BASE_URL = "http://localhost:5000/api";

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

    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error("API call failed:", error);
    return { ok: false, status: 0, data: { message: error.message } };
  }
};
// User API functions
export const userAPI = {
  getUsers: () => apiCall("/auth/users"), // GET all users
  login: (email, password) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (userData) =>
    apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  // Optional: implement if you add a check-email route in Node.js
  checkUserExists: (email) =>
    apiCall("/auth/check-email", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};

// Orders API (if you have order routes)
export const orderAPI = {
  getOrders: () => apiCall("/orders"),
  createOrder: (order) =>
    apiCall("/orders", { method: "POST", body: JSON.stringify(order) }),
  updateOrder: (id, order) =>
    apiCall(`/orders/${id}`, { method: "PUT", body: JSON.stringify(order) }),
  deleteOrder: (id) => apiCall(`/orders/${id}`, { method: "DELETE" }),
};
