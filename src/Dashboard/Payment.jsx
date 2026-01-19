import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
} from "@mui/material";

const Payment = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const all =
      JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(all);
  }, []);

  // ✅ CASH RECEIVED CONFIRM
  const confirmCashReceived = (id) => {
    const all =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const updated = all.map((b) =>
      b.id === id
        ? {
            ...b,
            paymentStatus: "Paid",
            paymentMode: "Cash",
          }
        : b
    );

    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4}>
        Admin – Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Typography>No bookings</Typography>
      ) : (
        bookings.map((b) => (
          <Paper key={b.id} sx={{ p: 2, mb: 2 }}>
            <Typography fontWeight="bold">
              {b.car_name}
            </Typography>

            <Typography>
              User: {b.userEmail}
            </Typography>

            <Typography>
              Status: {b.status}
            </Typography>

            <Typography>
              Payment Status: {b.paymentStatus}
            </Typography>

            <Divider sx={{ my: 1 }} />

            {/* 🔥 Show only when Cash selected */}
            {b.paymentStatus === "Cash" && (
              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  confirmCashReceived(b.id)
                }
              >
                Cash Received
              </Button>
            )}

            {/* ✅ Paid message */}
            {b.paymentStatus === "Paid" && (
              <Typography
                sx={{
                  mt: 1,
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Payment Confirmed ({b.paymentMode})
              </Typography>
            )}
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Payment;
