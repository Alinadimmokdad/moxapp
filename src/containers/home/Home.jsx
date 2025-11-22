import {
  Container,
  Box,
  Avatar,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userAPI } from "@/services/api";
import Sidebar from "@/components/sidebar/SideBar";

export default function Home() {
  const router = useRouter();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userAPI.getUsers();
        if (response.ok) setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    console.log("Fetching users...");
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) router.push("/");
    console.log(isAuthenticated, "aaaaaaaaaaaaaaa");
  }, [isAuthenticated, authLoading]);

  if (!isAuthenticated) return null;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Container maxWidth="lg" sx={{ mt: 4, ml: "240px" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
            {user?.email.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6">Hello, {user?.email}</Typography>

          <Button onClick={logout} sx={{ ml: "auto" }} variant="outlined">
            Logout
          </Button>
        </Box>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Users
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell>{u._id}</TableCell>
                <TableCell>{u.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
}
