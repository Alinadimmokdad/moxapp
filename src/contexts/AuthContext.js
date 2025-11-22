import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userAPI } from "@/services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true initially
  const router = useRouter();

  // Restore session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // ✅ Always set loading false at the end
    console.log("AuthProvider mounted");
  }, []);

  // 🚀 LOGIN using Node backend
  const login = async (email, password) => {
    try {
      setLoading(true);
      // ✅ this is where you paste it
      const response = await userAPI.login(email, password);

      // check if response is ok
      if (!response.ok) {
        const errorData = response.data; // get the error message from backend
        console.error("Login failed:", errorData.message);
        return false;
      }

      // parse JSON data from backend
      const data = response.data;

      if (data.token) {
        // store minimal user info
        const user = { email };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", data.token);

        router.push("/home"); // redirect after login
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//use jwt token
