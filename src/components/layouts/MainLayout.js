import { Box } from "@mui/material";
import Sidebar from "@/components/sidebar/SideBar";

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
