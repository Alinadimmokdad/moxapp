import { Box, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SharedWindow from "@/components/window/SharedWindow";
import CustomTextField from "@/components/custom-text-field";

export default function AddUserWindow({ open, onClose, onSuccess, userAPI }) {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain a lowercase letter")
      .matches(/[A-Z]/, "Password must contain an uppercase letter"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const res = await userAPI.register(values);

    if (res.ok) {
      onSuccess();
      onClose();
      resetForm();
    } else {
      alert(res.data.message || "Failed to create user");
    }

    setSubmitting(false);
  };

  return (
    <SharedWindow
      open={open}
      title="Add New User"
      onClose={onClose}
      onSubmit={() => document.getElementById("formik-submit-button").click()}
      submitLabel="Add"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <Form id="formik-form">
            <Grid container spacing={1} sx={{ mt: 1 }} direction="column">
              <Grid item xs={12}>
                <CustomTextField
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomTextField
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
            </Grid>

            {/* Hidden button to trigger Formik submit from SharedWindow */}
            <button
              type="submit"
              id="formik-submit-button"
              style={{ display: "none" }}
            />
          </Form>
        )}
      </Formik>
    </SharedWindow>
  );
}
