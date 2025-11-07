import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const CustomTextField = ({
  name,
  label,
  required = false,
  placeholder,
  type = "text",
  showPasswordToggle = true, // New prop to control visibility
  value,
  onChange,
  onBlur,
  error,
  helperText,
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const shouldShowPasswordToggle = type === "password" && showPasswordToggle;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      margin="normal"
      label={required ? `${label} *` : label}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      type={
        shouldShowPasswordToggle ? (showPassword ? "text" : "password") : type
      }
      InputProps={{
        endAdornment: shouldShowPasswordToggle ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      {...otherProps}
      sx={{
        "& .MuiOutlinedInput-root": {
          fontSize: "13px",
          height: "40px", // Fixed height
        },
        "& fieldset": {
          borderRadius: "2px", // Reduced from default 8px to 4px
          border: "3px solid #ced4da", // Custom border color
        },

        "& .MuiInputLabel-root": {
          fontSize: "13px",
          transform: "translate(14px, 9px) scale(1)", // Adjust label position
        },
        "& .MuiInputLabel-shrink": {
          transform: "translate(14px, -9px) scale(0.75)",
        },
        marginBottom: "8px", // Reduced spacing between fields
        ...otherProps.sx,
      }}
    />
  );
};

export default CustomTextField;
