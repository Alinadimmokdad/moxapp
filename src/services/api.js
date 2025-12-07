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
  searchUsers: ({ searchBy, searchTerm }) =>
    apiCall("/auth/users/search", {
      method: "POST",
      body: JSON.stringify({ searchBy, searchTerm }),
    }),
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
  deleteUser: (id) =>
    apiCall(`/auth/users/${id}`, {
      method: "DELETE",
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

export const zoneAPI = {
  getZones: () => apiCall("/zones"), // GET all zones
  getZone: (id) => apiCall(`/zones/${id}`), // GET zone by id
  createZone: (zone) =>
    apiCall("/zones", { method: "POST", body: JSON.stringify(zone) }),
  updateZone: (id, zone) =>
    apiCall(`/zones/${id}`, { method: "PUT", body: JSON.stringify(zone) }),
  deleteZone: (id) => apiCall(`/zones/${id}`, { method: "DELETE" }),
};

export const shipperAPI = {
  getShippers: (page = 1, limit = 15) =>
    apiCall(`/shippers?page=${page}&limit=${limit}`),
  getShipper: (id) => apiCall(`/shippers/${id}`),
  createShipper: (data) =>
    apiCall("/shippers", { method: "POST", body: JSON.stringify(data) }),
  updateShipper: (id, data) =>
    apiCall(`/shippers/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteShipper: (id) => apiCall(`/shippers/${id}`, { method: "DELETE" }),
  searchShippers: ({ searchBy, searchTerm }) =>
    apiCall("/shippers/search", {
      method: "POST",
      body: JSON.stringify({ searchBy, searchTerm }),
    }),
};

export const driverAPI = {
  getDrivers: (page = 1, limit = 15) =>
    apiCall(`/drivers?page=${page}&limit=${limit}`),

  getDriver: (id) => apiCall(`/drivers/${id}`),

  createDriver: (data) =>
    apiCall("/drivers", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateDriver: (id, data) =>
    apiCall(`/drivers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteDriver: (id) =>
    apiCall(`/drivers/${id}`, {
      method: "DELETE",
    }),

  searchDrivers: ({ searchBy, searchTerm }) =>
    apiCall("/drivers/search", {
      method: "POST",
      body: JSON.stringify({ searchBy, searchTerm }),
    }),
};
