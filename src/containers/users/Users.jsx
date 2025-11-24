import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { userAPI } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import TableCustom from "@/components/tables/TableCustom";
import Sidebar from "@/components/sidebar/SideBar";
import AddUserWindow from "./AddUserWindow";
import { useRouter } from "next/router";
import MainLayout from "@/components/layouts/MainLayout";
import { useLoading } from "@/contexts/LoadingContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { loading, setLoading } = useLoading();
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userAPI.getUsers();
      if (res.ok) setUsers(res.data);
      setAllUsers(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (field, value) => {
    if (value.trim() === "") {
      setUsers(allUsers);
      return;
    }

    const res = await userAPI.searchUsers({
      searchBy: field,
      searchTerm: value,
    });
    if (res.ok) setUsers(res.data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) router.push("/");
  }, [isAuthenticated, authLoading]);

  if (!isAuthenticated) return null;

  const handleDelete = async (row) => {
    const res = await userAPI.deleteUser(row._id);
    if (res.ok) fetchUsers();
    else alert(res.data.message);
  };

  return (
    <Box sx={{ display: "flex" }} p={1}>
      <TableCustom
        editable={false}
        title="Users"
        columns={[
          { field: "_id", headerName: "ID" },
          { field: "email", headerName: "Email" },
        ]}
        rows={users}
        onAdd={() => setOpenAdd(true)}
        onDelete={handleDelete}
        loading={loading}
        onSearch={handleSearch} // passes field and value to backend
        searchFields={["email"]} // select field to search by
      />

      {/* Add User Popup */}
      <AddUserWindow
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={fetchUsers}
        userAPI={userAPI}
      />
    </Box>
  );
}

Users.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
