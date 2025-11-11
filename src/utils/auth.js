import { API_BASE_URL } from "@/services/api";

export const authenticateUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    return user; // successful login
  } catch (error) {
    console.error("Authentication failed:", error);
    return null;
  }
};
