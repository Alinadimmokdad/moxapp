import {
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SharedWindow from "@/components/window/SharedWindow";
import CustomTextField from "@/components/custom-text-field";

export default function DriverFormModal({
  open,
  onClose,
  zones,
  initialValues,
  onSubmit,
}) {
  const validationSchema = Yup.object({
    name: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone number is required"),
    nationality: Yup.string().required("Nationality is required"),
    idNumber: Yup.string().required("ID number is required"),
    zone: Yup.string().required("Zone is required"),
  });

  return (
    <SharedWindow
      open={open}
      height="700"
      onClose={onClose}
      title={initialValues?._id ? "Edit Driver" : "Add Driver"}
      onSubmit={() => document.getElementById("driver-form-submit").click()}
      submitLabel={initialValues?._id ? "Update" : "Add"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form id="driver-form">
            <Grid container spacing={1}>
              {/* First Name */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <CustomTextField
                  name="name"
                  label="First Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  required
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <CustomTextField
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  required
                />
              </Grid>

              {/* Phone Number */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <CustomTextField
                  name="phone"
                  label="Phone Number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  required
                />
              </Grid>

              {/* Nationality */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <CustomTextField
                  name="nationality"
                  label="Nationality"
                  value={values.nationality}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.nationality && Boolean(errors.nationality)}
                  required
                />
              </Grid>

              {/* ID Number */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <CustomTextField
                  name="idNumber"
                  label="ID Number"
                  value={values.idNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.idNumber && Boolean(errors.idNumber)}
                  required
                />
              </Grid>

              {/* Zone Dropdown */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <FormControl
                  fullWidth
                  error={touched.zone && Boolean(errors.zone)}
                >
                  <InputLabel required>Zone</InputLabel>
                  <Select
                    name="zone"
                    value={values.zone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Zone"
                  >
                    {zones.map((z) => (
                      <MenuItem key={z._id} value={z._id}>
                        {z.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Availability Checkbox */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isAvailable"
                      checked={values.isAvailable}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  }
                  label="Available for delivery"
                />
              </Grid>
            </Grid>

            <button
              type="submit"
              id="driver-form-submit"
              style={{ display: "none" }}
            />
          </Form>
        )}
      </Formik>
    </SharedWindow>
  );
}
