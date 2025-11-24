import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Inventory2,
  Cancel,
  LocalShipping,
  Map,
  LocalShippingOutlined,
  People,
} from "@mui/icons-material";

const menuItems = [
  { label: "Orders", path: "/orders", icon: <Inventory2 /> },
  { label: "Canceled Orders", path: "/orders/canceled", icon: <Cancel /> },
  { label: "Drivers", path: "/drivers", icon: <LocalShipping /> },
  { label: "Zones", path: "/zones", icon: <Map /> },
  { label: "Shippers", path: "/shippers", icon: <LocalShippingOutlined /> },
  { label: "Users", path: "/users", icon: <People /> },
];

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoutClick = () => setOpenLogoutDialog(true);
  const handleLogoutConfirm = () => {
    logout();
    setOpenLogoutDialog(false);
  };
  const handleLogoutCancel = () => setOpenLogoutDialog(false);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            bgcolor: "#0b2742de", // keep the dark sidebar color
            color: "white", // white text
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 0,
            borderColor: "divider",
          },
        }}
      >
        <Box>
          <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Dashboard
            </Typography>
          </Toolbar>

          <List sx={{ mt: 2 }}>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.label}
                onClick={() => router.push(item.path)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  mb: 1,
                  color: "white", // default text color
                  "&.Mui-selected": {
                    bgcolor: "#1e293b",
                    color: "#ffffffff",
                    "& svg": { color: "#f3f3f3ff" },
                  },
                  "&:hover": {
                    bgcolor: "#1e293b",
                    "& svg": { color: "#4f46e5" },
                  },
                }}
                selected={router.pathname === item.path}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Logout button */}
        <Box sx={{ px: 2, mb: 6 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleLogoutClick}
            sx={{
              color: "white", // make text white
              borderColor: "white", // white border
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 1,
              py: 1,
              display: "flex",
              justifyContent: "flex-start",
              gap: 1,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)", // subtle hover effect
              },
            }}
          >
            → Logout
          </Button>
        </Box>
      </Drawer>

      {/* Logout confirmation dialog */}
      <Dialog open={openLogoutDialog} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleLogoutConfirm}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
