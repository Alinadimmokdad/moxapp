import { useAuth } from "@/contexts/AuthContext";
import { orderAPI, userAPI } from "@/services/api";
import {
  Container,
  Typography,
  Box,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    zone: "",
    shipper: "",
    driver: "",
    price: "",
    delivery_charge: "",
  });

  // Fetch orders
  // const fetchOrders = async () => {
  //   try {
  //     setLoading(true);
  //     const data = await orderAPI.getOrders();
  //     setOrders(data);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userAPI.getUsers();
        if (response.ok) {
          setUsers(response.data);
        } else {
          console.error("Failed to fetch users:", response.status);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      router.push("/");
      return;
    }
  }, [isAuthenticated, authLoading, router]);

  const handleLogout = () => {
    logout();
  };

  const handleOpenDialog = (order = null) => {
    setEditingOrder(order);
    if (order) {
      setFormData({ ...order });
    } else {
      setFormData({
        zone: "",
        shipper: "",
        driver: "",
        price: "",
        delivery_charge: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    try {
      const dataToSend = {
        ...formData,
        user: user.id,
        price: parseFloat(formData.price),
        delivery_charge: parseFloat(formData.delivery_charge),
      };

      if (editingOrder) {
        await orderAPI.updateOrder(editingOrder.id, dataToSend);
      } else {
        await orderAPI.createOrder(dataToSend);
      }

      fetchOrders();
      handleCloseDialog();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await orderAPI.deleteOrder(id);
        fetchOrders();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!isAuthenticated) return null;

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
          {user?.email.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h6">Hello, {user?.email}</Typography>
        <Button onClick={handleLogout} sx={{ ml: "auto" }} variant="outlined">
          Logout
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Orders</Typography>
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Add Order
        </Button>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          {/* <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Zone</TableCell>
            <TableCell>Shipper</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Delivery Charge</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow> */}
        </TableHead>
        <TableBody>
          {users.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.email}</TableCell>
              {/* <TableCell>{order.shipper}</TableCell>
              <TableCell>{order.driver}</TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.delivery_charge}</TableCell> */}
              {/* <TableCell>
                {new Date(order.created_at).toLocaleString()}
              </TableCell> */}
              {/* <TableCell>
                <IconButton onClick={() => handleOpenDialog(order)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(order.id)}>
                  <Delete color="error" />
                </IconButton>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for Add/Edit */}
      {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingOrder ? "Edit Order" : "Add Order"}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Zone"
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Shipper"
            name="shipper"
            value={formData.shipper}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Driver"
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Delivery Charge"
            name="delivery_charge"
            type="number"
            value={formData.delivery_charge}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingOrder ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog> */}
    </Container>
  );
}
