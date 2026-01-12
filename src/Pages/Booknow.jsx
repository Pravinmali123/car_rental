import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const Booknow = ({ open, onClose, selectedCar, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pickup: "",
    returnDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.mobile || !formData.pickup || !formData.returnDate) {
      alert("Please fill all details");
      return;
    }

    onConfirm({
      carId: selectedCar.id,
      carName: selectedCar.name,
      price: selectedCar.price,
      pickup: formData.pickup,
      returnDate: formData.returnDate,
      status: "Pending",
    });

    
    setFormData({
      name: "",
      mobile: "",
      pickup: "",
      returnDate: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Car Booking</DialogTitle>
      <DialogContent>
        <Typography fontWeight="bold" mb={2}>
          {selectedCar?.name}
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          margin="dense"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Mobile Number"
          name="mobile"
          margin="dense"
          value={formData.mobile}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type="date"
          label="Pickup Date"
          name="pickup"
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={formData.pickup}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type="date"
          label="Return Date"
          name="returnDate"
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={formData.returnDate}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Booknow;