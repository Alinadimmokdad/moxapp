import { useAuth } from "../contexts/AuthContext";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Home() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mb: 2,
              bgcolor: "primary.main",
            }}
          >
            {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
          </Avatar>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Hello, {user?.name || "User"}! 👋
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => console.log("Navigate to dashboard")}
            >
              Go to Dashboard
            </Button>

            <Button variant="outlined" size="large" onClick={handleLogout}>
              Logout
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/news")}
            >
              Go to News
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
