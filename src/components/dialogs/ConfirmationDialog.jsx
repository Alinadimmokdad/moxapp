import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this item?",
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: 300,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", color: "error.main" }}>
        Confirm Delete
      </DialogTitle>

      <DialogContent>
        <Typography color="text.secondary">{message}</Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 1,
            color: "text.primary",
            borderColor: "grey.400",
            "&:hover": { borderColor: "grey.600" },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{ textTransform: "none", borderRadius: 1 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
