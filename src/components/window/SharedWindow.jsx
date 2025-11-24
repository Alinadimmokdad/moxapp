// components/shared/SharedWindow.js
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Button,
  Typography,
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
      onClose={(event, reason) => {
        // Prevent closing when clicking backdrop or pressing Escape
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        onClose?.();
      }}
      PaperProps={{
        sx: {
          width: width,
          height: height,
          borderRadius: 2,
          overflow: "hidden",
        },
      }}
    >
      {/* Title + Close button */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
          px: 3,
          py: 1.5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Body */}
      <DialogContent
        dividers
        sx={{
          px: 3,
          py: 2,
          overflowY: "auto",
          height: `calc(${height} - 120px)`, // leaves space for title + actions
        }}
      >
        {children}
      </DialogContent>

      {/* Footer */}
      <DialogActions
        sx={{ px: 3, py: 2, borderTop: "1px solid", borderColor: "divider" }}
      >
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
          onClick={onSubmit}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 1,
            ml: 1,
          }}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
