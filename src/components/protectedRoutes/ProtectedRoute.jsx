import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // prevents flashing content
  }

  return children;
}
