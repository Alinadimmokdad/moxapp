import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import TableCustom from "@/components/tables/TableCustom";
import ZoneFormModal from "./ZoneFormModal";
import { zoneAPI } from "@/services/api";
import MainLayout from "@/components/layouts/MainLayout";
import { useLoading } from "@/contexts/LoadingContext";

export default function Zones() {
  const [zones, setZones] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const { loading, setLoading } = useLoading();

  const fetchZones = async () => {
    try {
      setLoading(true);
      const res = await zoneAPI.getZones();
      if (res.ok) setZones(res.data);
    } finally {
      setLoading(false); // always stop loading
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const handleAdd = () => {
    setSelectedZone(null);
    setOpenForm(true);
  };

  const handleEdit = async (zone) => {
    const res = await zoneAPI.getZone(zone._id);
    if (res.ok) {
      setSelectedZone(res.data); // populate modal
      setOpenForm(true);
    } else {
      alert("Failed to fetch zone details");
    }
  };

  const handleDelete = async (zone) => {
    const res = await zoneAPI.deleteZone(zone._id);
    if (res.ok) fetchZones();
    else alert(res.data.message);
  };

  const handleFormSubmit = async (values) => {
    let res;
    if (values._id) {
      res = await zoneAPI.updateZone(values._id, values);
    } else {
      res = await zoneAPI.createZone(values);
    }

    if (res.ok) {
      fetchZones();
      setOpenForm(false);
    } else {
      alert(res.data.message || "Failed to save zone");
    }
  };

  return (
    <Box sx={{ display: "flex" }} p={1}>
      {/* <Container maxWidth="lg" sx={{ mt: 4 }}> */}
      <TableCustom
        title="Zones"
        columns={[
          { field: "name", headerName: "Zone Name" },
          { field: "description", headerName: "Description" },
          { field: "estimatedDeliveryTime", headerName: "Estimated Time" },
          {
            field: "isActive",
            headerName: "Active",
            renderCell: (row) => (row.isActive ? "True" : "False"),
          },
        ]}
        rows={zones}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {/* </Container> */}

      <ZoneFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        initialValues={
          selectedZone || {
            name: "",
            description: "",
            estimatedDeliveryTime: "",
            isActive: true,
          }
        }
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
}

Zones.getLayout = (page) => <MainLayout>{page}</MainLayout>;
