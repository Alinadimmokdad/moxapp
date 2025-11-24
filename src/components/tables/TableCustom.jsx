import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  IconButton,
  Box,
  Typography,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import ConfirmDialog from "../dialogs/ConfirmationDialog";

export default function TableCustom({
  title = "Table",
  columns = [],
  rows = [],
  onEdit = null,
  onDelete = null,
  onAdd = null,
  editable = true,
  onSearch = null,
  searchFields = [],
  loading = false,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState(searchFields[0] || "");

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete && selectedRow) onDelete(selectedRow);
    setOpenConfirm(false);
    setSelectedRow(null);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch && searchBy) onSearch(searchBy, value);
  };

  const handleSearchByChange = (e) => {
    const value = e.target.value;
    setSearchBy(value);
    if (onSearch) onSearch(value, searchTerm);
  };

  return (
    <Box width="100%">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Left: Title + Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>

          {onSearch && searchFields.length > 0 && (
            <>
              <FormControl size="small" sx={{ minWidth: 130 }}>
                <InputLabel>Search By</InputLabel>
                <Select
                  value={searchBy}
                  onChange={handleSearchByChange}
                  label="Search By"
                >
                  {searchFields.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                size="small"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  minWidth: 200,
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                }}
              />
            </>
          )}
        </Box>

        {/* Right: Add Button */}
        {onAdd && (
          <Button variant="contained" color="primary" onClick={onAdd}>
            Add
          </Button>
        )}
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          borderRadius: 0,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: "100%" }} size="medium">
          <TableHead>
            <TableRow sx={{ height: 3.8 }}>
              {" "}
              {/* very compact header */}
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{
                    fontSize: "0.95rem",

                    fontWeight: "bold",
                    py: 1.3,
                    px: 1.2,
                  }}
                >
                  {col.headerName}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell
                  sx={{ fontSize: "0.95rem", py: 1, px: 0.9 }}
                ></TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  sx={{ textAlign: "center", py: 1.5 }}
                >
                  <CircularProgress size={20} />
                </TableCell>
              </TableRow>
            )}
            {!loading && rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "background.paper",
                    },
                    "&:hover": {
                      backgroundColor: "action.hover",
                      cursor: "pointer",
                    },
                    height: 3.6,
                  }}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.field}
                      sx={{
                        fontSize: "1rem",
                        color: "text.primary",
                        fontWeight: 500,
                        py: 1,
                        px: 0.9,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {col.renderCell ? col.renderCell(row) : row[col.field]}
                    </TableCell>
                  ))}

                  {(onEdit || onDelete) && (
                    <TableCell sx={{ py: 1, px: 0.9 }}>
                      {onEdit && editable && (
                        <IconButton
                          onClick={() => onEdit(row)}
                          color="primary"
                          size="small"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton
                          onClick={() => handleDeleteClick(row)}
                          color="error"
                          size="small"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
