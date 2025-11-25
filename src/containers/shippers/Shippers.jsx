import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableCustom from "@/components/tables/TableCustom";
import { shipperAPI, zoneAPI } from "@/services/api";
import MainLayout from "@/components/layouts/MainLayout";
import { useLoading } from "@/contexts/LoadingContext";
import ShipperFormModal from "./ShippersFormModal";

export default function Shippers() {
  const [shippers, setShippers] = useState([]);
  const [allShippers, setAllShippers] = useState([]);
  const [zones, setZones] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedShipper, setSelectedShipper] = useState(null);
  const { loading, setLoading } = useLoading();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // GET ZONES
  const fetchZones = async () => {
    const res = await zoneAPI.getZones();
    if (res.ok) setZones(res.data);
  };

  const fetchShippers = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await shipperAPI.getShippers(pageNumber, 15);
      if (res.ok) {
        setShippers(res.data.data);
        setPage(res.data.page);
        setTotalPages(res.data.totalPages);
        setAllShippers(res.data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    fetchShippers(newPage);
  };

  useEffect(() => {
    fetchZones();
    fetchShippers();
  }, []);

  // SEARCH
  const handleSearch = async (field, value) => {
    if (value.trim() === "") {
      setShippers(allShippers);
      return;
    }

    const res = await shipperAPI.searchShippers({
      searchBy: field,
      searchTerm: value,
    });

    if (res.ok) setShippers(res.data);
  };
  const handleAdd = () => {
    setSelectedShipper(null);
    setOpenForm(true);
  };

  const handleEdit = async (shipper) => {
    const res = await shipperAPI.getShipper(shipper._id);
    if (res.ok) {
      const data = res.data;

      data.zone = data.zone?._id || "";

      setSelectedShipper(data);
      setOpenForm(true);
    } else {
      alert("Failed to fetch shipper details");
    }
  };

  const handleDelete = async (shipper) => {
    const res = await shipperAPI.deleteShipper(shipper._id);
    if (res.ok) fetchShippers();
    else alert(res.data.message);
  };

  const handleFormSubmit = async (values) => {
    let res;
    if (values._id) {
      res = await shipperAPI.updateShipper(values._id, values);
    } else {
      res = await shipperAPI.createShipper(values);
    }

    if (res.ok) {
      fetchShippers();
      setOpenForm(false);
    } else {
      alert(res.data.message || "Failed to save shipper");
    }
  };

  return (
    <Box sx={{ display: "flex" }} p={1}>
      <TableCustom
        title="Shippers"
        editable
        columns={[
          { field: "name", headerName: "Name" },
          { field: "pageName", headerName: "Page Name" },
          { field: "phoneNumber", headerName: "Phone Number" },
          { field: "address", headerName: "Address" },
          {
            field: "zone",
            headerName: "Zone",
            renderCell: (row) => row.zone?.name || "-",
          },
        ]}
        rows={shippers}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={handleSearch}
        searchFields={["name", "pageName"]} // <--- SEARCH BY
        paginationNeeded={true}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ShipperFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        zones={zones}
        initialValues={
          selectedShipper || {
            name: "",
            pageName: "",
            phoneNumber: "",
            address: "",
            zone: "",
          }
        }
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
}

Shippers.getLayout = (page) => <MainLayout>{page}</MainLayout>;
