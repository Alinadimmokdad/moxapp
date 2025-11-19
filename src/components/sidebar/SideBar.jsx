import {
  Drawer,
  List,
  ListItemButton,
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

const menuItems = [
  { label: "Orders", path: "/orders" },
  { label: "Canceled Orders", path: "/orders/canceled" },
  { label: "Drivers", path: "/drivers" },
  { label: "Zones", path: "/zones" },
  { label: "Shippers", path: "/shippers" },
  { label: "Users", path: "/users" },
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
          width: 220,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 220,
            boxSizing: "border-box",
            backgroundColor: "#0f172a",
            color: "white",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <Toolbar />
          <Box sx={{ mt: 2 }}>
            <Typography
              sx={{ px: 2, mb: 2, fontWeight: "bold", color: "#94a3b8" }}
            >
              Dashboard
            </Typography>

            <List>
              {menuItems.map((item) => (
                <ListItemButton
                  key={item.label}
                  onClick={() => router.push(item.path)}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    mb: 1,
                    "&.Mui-selected": {
                      backgroundColor: "#1e293b",
                    },
                    "&:hover": {
                      backgroundColor: "#1e293b",
                    },
                  }}
                  selected={router.pathname === item.path}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Box>

        {/* Logout button at bottom */}
        <Box sx={{ px: 2, mt: "auto", mb: 3 }}>
          {" "}
          {/* mt: "auto" pushes it up, mb: margin bottom */}
          <Button
            variant="text"
            fullWidth
            onClick={handleLogoutClick}
            sx={{
              color: "white",
              fontWeight: "bold",
              justifyContent: "flex-start",
              textTransform: "none",
              border: "1px solid white", // adds border
              borderRadius: 1, // optional rounded corners
              py: 1, // padding top/bottom
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)", // subtle hover effect
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
