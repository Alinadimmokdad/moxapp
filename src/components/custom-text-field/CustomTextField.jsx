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
    />
  );
};

export default CustomTextField;
