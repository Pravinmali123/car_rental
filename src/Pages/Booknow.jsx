import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";

const Booknow = ({ open, onClose, selectedCar, onConfirm, user }) => {
  if (!selectedCar) return null;

  const initialValues = {
    name: "",
    email: user?.email || "",
    mobile: "",
    pickup: "",
    pickupTime: "",
    returnDate: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    if (
      !values.name ||
      !values.email ||
      !values.mobile ||
      !values.pickup ||
      !values.pickupTime ||
      !values.returnDate
    ) {
      alert("Please fill all details");
      return;
    }

    const startDate = new Date(values.pickup);
    const endDate = new Date(values.returnDate);

    if (endDate < startDate) {
      alert("Return date must be after pickup date");
      return;
    }

    // ✅ FINAL booking object (VERY IMPORTANT)
    onConfirm({
      id: Date.now(),
      carId: selectedCar._id,
      car_name: selectedCar.car_name,

      userEmail: values.email,
      name: values.name,
      email: values.email,
      mobile: values.mobile,

      price: Number(selectedCar.price),

      startDate: values.pickup,       // ✅ REQUIRED
      endDate: values.returnDate,     // ✅ REQUIRED
      pickupTime: values.pickupTime,

      status: "Pending",
      paymentStatus: "Unpaid",
      paymentMode: "",

      waitingList: [],
    });

    alert("Booking sent for approval");

    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Car Booking</DialogTitle>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <DialogContent>
              <Typography fontWeight="bold" mb={2}>
                {selectedCar.car_name}
              </Typography>

              <TextField
                fullWidth
                margin="dense"
                label="Full Name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                margin="dense"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                margin="dense"
                label="Mobile Number"
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                margin="dense"
                type="date"
                label="Pickup Date"
                name="pickup"
                InputLabelProps={{ shrink: true }}
                value={values.pickup}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                margin="dense"
                type="time"
                label="Pickup Time"
                name="pickupTime"
                InputLabelProps={{ shrink: true }}
                value={values.pickupTime}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                margin="dense"
                type="date"
                label="Return Date"
                name="returnDate"
                InputLabelProps={{ shrink: true }}
                value={values.returnDate}
                onChange={handleChange}
              />

              <Typography fontWeight="bold" mt={2}>
                Price: ₹{selectedCar.price} / day
              </Typography>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="success">
                Confirm Booking
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default Booknow;
