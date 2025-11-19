// components/shared/SharedWindow.js
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SharedWindow({
  open,
  onClose,
  title,
  children,
  width = "700px",
  height = "550px",
  onSubmit,
  submitLabel = "Save",
}) {
  return (
    <Dialog
      open={open}
      onClose={() => {}}
      PaperProps={{
        sx: {
          width: width,
          height: height,
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
    >
      {/* Title + X */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Body */}
      <DialogContent dividers>{children}</DialogContent>

      {/* Footer */}
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>

        <Button onClick={onSubmit} variant="contained">
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
