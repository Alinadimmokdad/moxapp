import {
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SharedWindow from "@/components/window/SharedWindow";
import CustomTextField from "@/components/custom-text-field";

export default function ShipperFormModal({
  open,
  onClose,
  zones,
  initialValues,
  onSubmit,
}) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    zone: Yup.string().required("Zone is required"),
  });

  return (
    <SharedWindow
      open={open}
      height="700"
      onClose={onClose}
      title={initialValues?._id ? "Edit Shipper" : "Add Shipper"}
      onSubmit={() => document.getElementById("shipper-form-submit").click()}
      submitLabel={initialValues?._id ? "Update" : "Add"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form id="shipper-form">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <CustomTextField
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                required
              />

              <CustomTextField
                name="pageName"
                label="Page Name"
                value={values.pageName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomTextField
                name="phoneNumber"
                label="Phone Number"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                required
              />

              <CustomTextField
                name="address"
                label="Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {/* ZONE DROPDOWN */}
              <FormControl fullWidth>
                <InputLabel required>Zone</InputLabel>
                <Select
                  name="zone"
                  value={values.zone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.zone && Boolean(errors.zone)}
                  label="Zone"
                >
                  {zones.map((z) => (
                    <MenuItem key={z._id} value={z._id}>
                      {z.name}
                    </MenuItem>
                  ))}
                </Select>

                {touched.zone && errors.zone && (
                  <FormHelperText error>{errors.zone}</FormHelperText>
                )}
              </FormControl>

              <button
                type="submit"
                id="shipper-form-submit"
                style={{ display: "none" }}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </SharedWindow>
  );
}
