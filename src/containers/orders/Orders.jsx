import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { orderAPI, userAPI } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import TableCustom from "@/components/tables/TableCustom";
import { useRouter } from "next/router";
import MainLayout from "@/components/layouts/MainLayout";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  //   const fetchOrders = async () => {
  //     const res = await userAPI.getOrders();
  //     if (res.ok) setOrders(res.data);
  //   };

  //   useEffect(() => {
  //     fetchOrders();
  //   }, []);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) router.push("/");
    console.log(isAuthenticated, "aaaaaaaaaaaaaaa");
  }, [isAuthenticated, authLoading]);

  if (!isAuthenticated) return null;

  const handleDelete = async (row) => {
    const res = await orderAPI.deleteOrder(row._id);
    if (res.ok) console.log("fetchOrders()");
    else alert(res.data.message);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <TableCustom
          editable={false}
          title="Orders"
          columns={[{ field: "_id", headerName: "ID" }]}
          rows={orders}
          onAdd={() => setOpenAdd(true)}
          onDelete={handleDelete}
        />
      </Container>

      {/* Add User Popup */}
      {/* <AddUserWindow
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={fetchOrders}
        userAPI={userAPI}
      /> */}
    </Box>
  );
}

Orders.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
