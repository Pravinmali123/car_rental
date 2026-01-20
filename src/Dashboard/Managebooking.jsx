import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
} from "@mui/material";

const Managebooking = ({ bookings = [], setBookings }) => {
  // ✅ Safe date formatter (NaN FIX)
  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString();
  };

  // ✅ Approve / Reject
  const updateStatus = (index, status) => {
    const updated = [...bookings];
    updated[index].status = status;

    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4}>
        Admin – Booking Requests
      </Typography>

      {bookings.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography color="text.secondary">
            No bookings found
          </Typography>
        </Paper>
      ) : (
        bookings.map((b, i) => (
          <Paper key={i} sx={{ p: 2, mb: 2 }}>
            <Typography fontWeight="bold" variant="h6">
              {b.car_name || "N/A"}
            </Typography>

            <Typography>Name: {b.name || "N/A"}</Typography>
            <Typography>Email: {b.userEmail || b.email || "N/A"}</Typography>
            <Typography>Mobile: {b.mobile || "N/A"}</Typography>

            <Divider sx={{ my: 1 }} />

            <Typography>
              Pickup Date: {formatDate(b.startDate || b.pickup)}
            </Typography>
            <Typography>
              Return Date: {formatDate(b.endDate || b.returnDate)}
            </Typography>

            <Typography>Status: {b.status || "Pending"}</Typography>

            {/* ✅ PAYMENT STATUS */}
            {b.paymentStatus === "Paid" && (
              <Typography
                sx={{
                  mt: 1,
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                ✅ {b.paymentMode} Payment Successful
              </Typography>
            )}

            {/* Pending → Approve / Reject */}
            {b.status === "Pending" && (
              <Stack direction="row" spacing={2} mt={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => updateStatus(i, "Approved")}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => updateStatus(i, "Rejected")}
                >
                  Reject
                </Button>
              </Stack>
            )}
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Managebooking;
