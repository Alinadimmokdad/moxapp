import {
  Button,
  Typography,
  Box,
  Link as MuiLink,
  Alert,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import CustomTextField from "@/components/custom-text-field";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

const signInValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("required"),
  password: Yup.string().required("required"),
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
    <Grid container>
      <Grid
        item
        sx={{
          mb: 4, // Add margin bottom
        }}
      >
        <Image src="/images/mainlogo.jpg" height={72} width={80} alt="logo" />
      </Grid>
      <Grid item size={12}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
          align="left"
        >
          Welcome back! Please sign in to your account.
        </Typography>
      </Grid>

      <Grid item size={12}>
        {loginError && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {loginError}
          </Alert>
        )}
      </Grid>

      <Grid item size={12}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <Grid container spacing={1}>
            <Grid item size={12}>
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
                error={formik.touched.email && Boolean(formik.errors.email)} // Updated this line
                helperText={formik.touched.email && formik.errors.email} // Updated this line
              />
            </Grid>

            <Grid item size={12}>
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                } // Updated this line
                helperText={formik.touched.password && formik.errors.password} // Updated this line
              />
            </Grid>

            <Grid item size={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                Sign In
              </Button>
            </Grid>

            <Grid item size={12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  component="span"
                  color="text.secondary"
                >
                  Having trouble signing in?{" "}
                  <MuiLink
                    component="button"
                    variant="body2"
                    color="primary"
                    onClick={onForgotPassword}
                    sx={{
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Forgot password?
                  </MuiLink>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
