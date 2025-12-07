import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableCustom from "@/components/tables/TableCustom";
import { driverAPI, zoneAPI } from "@/services/api";
import MainLayout from "@/components/layouts/MainLayout";
import { useLoading } from "@/contexts/LoadingContext";
import { useSearch } from "@/contexts/SearchContext";
import DriverFormModal from "./DriverFormModal";
import { enqueueSnackbar } from "notistack";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [zones, setZones] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const { loading, setLoading } = useLoading();

  const { isSearching, searchTerm, searchBy, executeSearch } = useSearch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchZones = async () => {
    const res = await zoneAPI.getZones();
    if (res.ok) setZones(res.data);
  };

  const fetchDrivers = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await driverAPI.getDrivers(pageNumber, 15);
      if (res.ok) {
        setDrivers(res.data.data);
        setCurrentPage(res.data.page);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch drivers:", error);
      setDrivers([]);
      enqueueSnackbar("Failed to load drivers", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (!isSearching) {
      fetchDrivers(newPage);
    }
  };

  const handleSearch = async (field, value) => {
    executeSearch({
      searchAPI: driverAPI.searchDrivers,
      normalFetchAPI: driverAPI.getDrivers,
      searchParams: { field, value },
      onSearchResults: (data) => {
        setDrivers(data);
        setCurrentPage(1);
        setTotalPages(1);
      },
      onNormalResults: (data) => {
        setDrivers(data.data);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
      },
      currentPage,
    });
  };

  const handleAdd = () => {
    setSelectedDriver(null);
    setOpenForm(true);
  };

  const handleEdit = async (driver) => {
    try {
      const res = await driverAPI.getDriver(driver._id);
      if (res.ok) {
        const data = res.data;
        data.zone = data.zone?._id || "";
        setSelectedDriver(data);
        setOpenForm(true);
      } else {
        enqueueSnackbar("Failed to fetch driver details", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error fetching driver details", { variant: "error" });
    }
  };

  const handleDelete = async (driver) => {
    try {
      setLoading(true);
      const res = await driverAPI.deleteDriver(driver._id);
      if (res.ok) {
        enqueueSnackbar("Driver deleted successfully!", { variant: "success" });
        if (isSearching && searchTerm) {
          handleSearch(searchBy, searchTerm);
        } else {
          fetchDrivers(currentPage);
        }
      } else {
        enqueueSnackbar(res.data.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error deleting driver", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const res = values._id
        ? await driverAPI.updateDriver(values._id, values)
        : await driverAPI.createDriver(values);

      if (res.ok) {
        enqueueSnackbar(
          values._id
            ? "Driver updated successfully!"
            : "Driver created successfully!",
          { variant: "success" }
        );

        setOpenForm(false);
        if (isSearching && searchTerm) {
          handleSearch(searchBy, searchTerm);
        } else {
          fetchDrivers(currentPage);
        }
      } else {
        enqueueSnackbar(res.data.message || "Failed to save driver", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Error saving driver", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
    fetchDrivers();
  }, []);

  return (
    <Box sx={{ display: "flex" }} p={1}>
      <TableCustom
        title="Drivers"
        editable
        columns={[
          { field: "name", headerName: "First Name" },
          { field: "lastName", headerName: "Last Name" },
          { field: "phone", headerName: "Phone Number" },
          { field: "nationality", headerName: "Nationality" },
          { field: "idNumber", headerName: "ID Number" },
          {
            field: "zone",
            headerName: "Zone",
            renderCell: (row) => row.zone?.name || "-",
          },
          {
            field: "isAvailable",
            headerName: "Status",
            renderCell: (row) =>
              row.isAvailable ? "Available" : "Not Available",
          },
        ]}
        rows={drivers}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={handleSearch}
        searchFields={["name", "lastName", "phone", "nationality", "idNumber"]}
        paginationNeeded={!isSearching}
        page={isSearching ? 1 : currentPage}
        totalPages={isSearching ? 1 : totalPages}
        onPageChange={handlePageChange}
      />

      <DriverFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        zones={zones}
        initialValues={
          selectedDriver || {
            name: "",
            lastName: "",
            phone: "",
            nationality: "",
            idNumber: "",
            zone: "",
            isAvailable: true,
          }
        }
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
}

Drivers.getLayout = (page) => <MainLayout>{page}</MainLayout>;
