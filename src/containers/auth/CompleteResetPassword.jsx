import CustomTextField from "@/components/custom-text-field";
import { Button, Typography, Box, Link as MuiLink } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const resetPasswordValidationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^\d+$/, "OTP must contain only numbers")
    .required("OTP is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const CompleteResetPasswordForm = ({ email, onBackToSignIn, onResendOTP }) => {
  const formik = useFormik({
    initialValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidationSchema,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          console.log("Password reset completed:", {
            email: email,
            otp: values.otp,
            newPassword: values.newPassword,
          });
          onBackToSignIn?.();
        }
      });
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
        We sent a 6-digit code to {email}
      </Typography>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%" }}
      >
        {/* OTP Field */}
        <CustomTextField
          name="otp"
          label="Verification Code"
          required
          placeholder="Enter 6-digit OTP"
          type="text"
          autoComplete="one-time-code"
          autoFocus
          value={formik.values.otp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.submitCount > 0 && Boolean(formik.errors.otp)}
          helperText={formik.submitCount > 0 && formik.errors.otp}
        />

        {/* New Password Field */}
        <CustomTextField
          name="newPassword"
          label="New Password"
          required
          placeholder="Enter new password"
          type="password"
          autoComplete="new-password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.submitCount > 0 && Boolean(formik.errors.newPassword)}
          helperText={formik.submitCount > 0 && formik.errors.newPassword}
        />

        {/* Confirm Password Field */}
        <CustomTextField
          name="confirmPassword"
          label="Confirm New Password"
          required
          placeholder="Re-enter new password"
          type="password"
          autoComplete="new-password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.submitCount > 0 && Boolean(formik.errors.confirmPassword)
          }
          helperText={formik.submitCount > 0 && formik.errors.confirmPassword}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
          size="large"
        >
          Reset Password
        </Button>

        {/* Back Button */}
        <Button
          fullWidth
          variant="outlined"
          onClick={onBackToSignIn}
          sx={{ mt: 1, mb: 1 }}
        >
          Back to Sign In
        </Button>

        {/* Resend OTP Link */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <MuiLink
            component="button"
            variant="body2"
            color="secondary"
            onClick={onResendOTP}
          >
            Didnt receive code? Resend OTP
          </MuiLink>
        </Box>
      </Box>
    </>
  );
};

export default CompleteResetPasswordForm;
