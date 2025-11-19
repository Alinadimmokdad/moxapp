import { Box, Container } from "@mui/material";
import Sidebar from "@/components/sidebar/SideBar";

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Container maxWidth="lg" sx={{ mt: 4, ml: "240px" }}>
        {children}
      </Container>
    </Box>
  );
}

// import { Box, Container } from "@mui/material";
// import Sidebar from "@/components/sidebar/SideBar";

// export default function MainLayout({ children }) {
//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content */}
//       <Container maxWidth="lg" sx={{ mt: 4, ml: "240px" }}>
//         {children}
//       </Container>
//     </Box>
//   );
// }
