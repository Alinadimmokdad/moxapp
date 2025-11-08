import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const News = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/");
    }
    console.log(isAuthenticated, "aaaaaaaaaaaaaaa");
  }, [isAuthenticated, router]);
  return isAuthenticated && <div>HIIIIIIIIIIIIIIIIIIII {user.name}</div>;
};

export default News;
