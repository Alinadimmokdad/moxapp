import { Button, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomTextField from "@/components/custom-text-field";

const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const SendResetLinkForm = ({ onBackToSignIn, onSendOTP }) => {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: async (values) => {
      try {
        // Check if email exists
        const checkRes = await fetch(
          "http://localhost:5000/api/auth/check-email",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: values.email }),
          }
        );
        const checkData = await checkRes.json();

        if (!checkData.exists) {
          formik.setErrors({ email: "This email does not exist" });
          return;
        }

        // Send OTP
        const otpRes = await fetch(
          "http://localhost:5000/api/auth/forgot-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: values.email }),
          }
        );
        const otpData = await otpRes.json();

        if (otpRes.ok) {
          onSendOTP?.(values.email);
          console.log(otpData.message);
        } else {
          console.error("Failed to send OTP:", otpData.message);
        }
      } catch (err) {
        console.error("Error sending OTP:", err);
      }
    },
  });
  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom color="primary">
        Reset Password
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Enter your email address and well send you a link to reset your
        password.
      </Typography>

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
          error={formik.submitCount > 0 && Boolean(formik.errors.email)} // Only show error after submit attempt
          helperText={formik.submitCount > 0 && formik.errors.email} // Only show error after submit attempt
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
          size="large"
        >
          Send Reset Link
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={onBackToSignIn}
          sx={{ mt: 1 }}
        >
          Back to Sign In
        </Button>
      </Box>
    </>
  );
};

export default SendResetLinkForm;
