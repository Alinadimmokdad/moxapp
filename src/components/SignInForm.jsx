import { Button, Typography, Box, Link as MuiLink, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import CustomTextField from "./CustomTextField";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const signInValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignInForm = ({ onForgotPassword }) => {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          // Use auth context to login
          const success = login(values.email, values.password);

          if (success) {
            console.log("Login successful");
            setLoginError("");
            // No need to redirect here - the auth context will handle it
          } else {
            console.log("Login failed: Invalid credentials");
            setLoginError("Invalid email or password");
          }
        }
      });
    },
  });

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom color="primary">
        Sign In
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Welcome back! Please sign in to your account.
      </Typography>

      {loginError && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {loginError}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%" }}
      >
        <CustomTextField
          name="email"
          label="Email Address"
          required
          placeholder="Enter your email"
          type="email"
          autoComplete="email"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.submitCount > 0 && Boolean(formik.errors.email)}
          helperText={formik.submitCount > 0 && formik.errors.email}
        />

        <CustomTextField
          name="password"
          label="Password"
          required
          placeholder="Enter your password"
          type="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.submitCount > 0 && Boolean(formik.errors.password)}
          helperText={formik.submitCount > 0 && formik.errors.password}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          size="large"
        >
          Sign In
        </Button>
        <Box sx={{ textAlign: "center" }}>
          <MuiLink
            component="button"
            variant="body2"
            color="secondary"
            onClick={onForgotPassword}
          >
            Forgot password?
          </MuiLink>
        </Box>
      </Box>
    </>
  );
};

export default SignInForm;
