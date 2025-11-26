import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableCustom from "@/components/tables/TableCustom";
import { shipperAPI, zoneAPI } from "@/services/api";
import MainLayout from "@/components/layouts/MainLayout";
import { useLoading } from "@/contexts/LoadingContext";
import { useSearch } from "@/contexts/SearchContext";
import ShipperFormModal from "./ShippersFormModal";

export default function Shippers() {
  const [shippers, setShippers] = useState([]);
  const [zones, setZones] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedShipper, setSelectedShipper] = useState(null);
  const { loading, setLoading } = useLoading();

  const { isSearching, searchTerm, searchBy, executeSearch } = useSearch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchZones = async () => {
    const res = await zoneAPI.getZones();
    if (res.ok) setZones(res.data);
  };

  const fetchShippers = async (pageNumber = 1) => {
    try {
      setLoading(true); // ✅ Set loading at start
      const res = await shipperAPI.getShippers(pageNumber, 15);
      if (res.ok) {
        setShippers(res.data.data);
        setCurrentPage(res.data.page);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch shippers:", error);
      setShippers([]); // ✅ Clear shippers on error
    } finally {
      setLoading(false); // ✅ Always clear loading
    }
  };

  const handlePageChange = (newPage) => {
    if (!isSearching) {
      fetchShippers(newPage);
    }
  };

  const handleSearch = async (field, value) => {
    executeSearch({
      searchAPI: shipperAPI.searchShippers,
      normalFetchAPI: shipperAPI.getShippers,
      searchParams: { field, value },
      onSearchResults: (data) => {
        setShippers(data);
        setCurrentPage(1);
        setTotalPages(1);
      },
      onNormalResults: (data) => {
        setShippers(data.data);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
      },
      currentPage,
    });
  };

  const handleAdd = () => {
    setSelectedShipper(null);
    setOpenForm(true);
  };

  const handleEdit = async (shipper) => {
    try {
      setLoading(true);
      const res = await shipperAPI.getShipper(shipper._id);
      if (res.ok) {
        const data = res.data;
        data.zone = data.zone?._id || "";
        setSelectedShipper(data);
        setOpenForm(true);
      } else {
        alert("Failed to fetch shipper details");
      }
    } catch (error) {
      alert("Error fetching shipper details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shipper) => {
    try {
      setLoading(true);
      const res = await shipperAPI.deleteShipper(shipper._id);
      if (res.ok) {
        if (isSearching && searchTerm) {
          handleSearch(searchBy, searchTerm);
        } else {
          fetchShippers(currentPage);
        }
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("Error deleting shipper");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const res = values._id
        ? await shipperAPI.updateShipper(values._id, values)
        : await shipperAPI.createShipper(values);

      if (res.ok) {
        setOpenForm(false);
        if (isSearching && searchTerm) {
          handleSearch(searchBy, searchTerm);
        } else {
          fetchShippers(currentPage);
        }
      } else {
        alert(res.data.message || "Failed to save shipper");
      }
    } catch (error) {
      alert("Error saving shipper");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
    fetchShippers();
  }, []);

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
        searchFields={["name", "pageName", "phoneNumber"]}
        paginationNeeded={!isSearching}
        page={isSearching ? 1 : currentPage}
        totalPages={isSearching ? 1 : totalPages}
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
