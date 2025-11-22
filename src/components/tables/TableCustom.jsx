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
  Checkbox,
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
  loading = false,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete && selectedRow) onDelete(selectedRow);
    setOpenConfirm(false);
    setSelectedRow(null);
  };

  return (
    <Box width={"100%"}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">{title}</Typography>
        {onAdd && (
          <Button variant="contained" onClick={onAdd}>
            Add
          </Button>
        )}
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          width: "100%", // full width of its parent
        }}
      >
        <Table sx={{ minWidth: "100%" }} size="large">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{ fontWeight: "bold", fontSize: "1.1rem", py: 2 }}
                >
                  {col.headerName}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell sx={{ fontSize: "1.1rem", py: 2 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  sx={{ textAlign: "center", py: 5, fontSize: "1.1rem" }}
                >
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              rows.map((row) => (
                <TableRow key={row._id} sx={{ py: 3 }}>
                  {columns.map((col) => (
                    <TableCell key={col.field} sx={{ fontSize: "1rem", py: 2 }}>
                      {col.renderCell ? (
                        col.renderCell(row)
                      ) : col.type === "checkbox" ? (
                        <Checkbox checked={row[col.field]} disabled />
                      ) : (
                        row[col.field]
                      )}
                    </TableCell>
                  ))}

                  {(onEdit || onDelete) && (
                    <TableCell sx={{ py: 2 }}>
                      {onEdit && editable && (
                        <IconButton onClick={() => onEdit(row)}>
                          <Edit />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton
                          onClick={() => handleDeleteClick(row)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}

            {!loading && rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  sx={{
                    textAlign: "center",
                    py: 5,
                    color: "gray",
                    fontSize: "1rem",
                  }}
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
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
