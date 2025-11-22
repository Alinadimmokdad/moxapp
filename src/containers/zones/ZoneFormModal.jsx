// components/zones/ZoneFormModal.jsx
import {
  Box,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form } from "formik";
import CustomTextField from "@/components/custom-text-field";
import * as Yup from "yup";
import SharedWindow from "@/components/window/SharedWindow";

export default function ZoneFormModal({
  open,
  onClose,
  initialValues,
  onSubmit,
}) {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Zone name is required")
      .min(2, "Zone name must be at least 2 characters")
      .max(50, "Zone name must be at most 50 characters"),
    description: Yup.string().max(200, "Description is too long"),
    estimatedDeliveryTime: Yup.string().required(
      "Estimated delivery time is required"
    ),
    isActive: Yup.boolean(),
  });

  const dayOptions = ["1 - 2 days", "3 - 4 days", "5 - 6 days"];

  return (
    <SharedWindow
      open={open}
      onClose={onClose}
      title={initialValues?._id ? "Edit Zone" : "Add Zone"}
      onSubmit={() => document.getElementById("zone-form-submit").click()}
      submitLabel={initialValues?._id ? "Update" : "Add"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form id="zone-form">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <CustomTextField
                name="name"
                label="Zone Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                required
              />

              <CustomTextField
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <FormControl fullWidth>
                <InputLabel required>Estimated Delivery Time (days)</InputLabel>
                <Select
                  name="estimatedDeliveryTime"
                  value={values.estimatedDeliveryTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.estimatedDeliveryTime &&
                    Boolean(errors.estimatedDeliveryTime)
                  }
                  label="Estimated Delivery Time (days)"
                >
                  <MenuItem value="1 - 2 days">1 - 2 days</MenuItem>
                  <MenuItem value="3 - 4 days">3 - 4 days</MenuItem>
                  <MenuItem value="5 - 6 days">5 - 6 days</MenuItem>
                </Select>
                {touched.estimatedDeliveryTime &&
                  errors.estimatedDeliveryTime && (
                    <FormHelperText error>
                      {errors.estimatedDeliveryTime}
                    </FormHelperText>
                  )}
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    name="isActive"
                    checked={values.isActive}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Active"
              />

              <button
                type="submit"
                id="zone-form-submit"
                style={{ display: "none" }}
                disabled={isSubmitting}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </SharedWindow>
  );
}
