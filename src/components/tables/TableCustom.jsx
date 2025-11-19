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
    <Box>
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
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field} sx={{ fontWeight: "bold" }}>
                  {col.headerName}
                </TableCell>
              ))}

              {(onEdit || onDelete) && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  sx={{ textAlign: "center", py: 3 }}
                >
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              rows.map((row) => (
                <TableRow key={row._id}>
                  {columns.map((col) => (
                    <TableCell key={col.field}>{row[col.field]}</TableCell>
                  ))}

                  {(onEdit || onDelete) && (
                    <TableCell>
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
                  sx={{ textAlign: "center", py: 3, color: "gray" }}
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
