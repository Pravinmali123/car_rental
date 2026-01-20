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

  // ✅ Load all bookings
  useEffect(() => {
    const all =
      JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(all);
  }, []);

  // ✅ Safe total days calculation (NaN FIX)
  const calculateDays = (start, end) => {
    if (!start || !end) return 1;

    const s = new Date(start);
    const e = new Date(end);

    if (isNaN(s.getTime()) || isNaN(e.getTime())) return 1;

    s.setHours(0, 0, 0, 0);
    e.setHours(0, 0, 0, 0);

    return (
      (e - s) / (1000 * 60 * 60 * 24) + 1
    );
  };

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
        Admin – Payments
      </Typography>

      {bookings.length === 0 ? (
        <Typography>No bookings</Typography>
      ) : (
        bookings.map((b) => {
          const totalDays = calculateDays(
            b.startDate,
            b.endDate
          );
          const pricePerDay = Number(b.price || 0);
          const totalPrice =
            totalDays * pricePerDay;

          return (
            <Paper key={b.id} sx={{ p: 2, mb: 2 }}>
              <Typography fontWeight="bold" variant="h6">
                {b.car_name}
              </Typography>

              <Typography>User: {b.userEmail}</Typography>
              <Typography>Status: {b.status}</Typography>

              <Divider sx={{ my: 1 }} />

              {/* 💰 PRICE DETAILS */}
              <Typography>
                Price / Day: ₹{pricePerDay}
              </Typography>
              <Typography>
                Total Days: {totalDays}
              </Typography>
              <Typography fontWeight="bold">
                Total Amount: ₹{totalPrice}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography>
                Payment Status: {b.paymentStatus}
              </Typography>

              {/* 🔥 Cash selected but not yet confirmed */}
              {b.paymentStatus === "Paid" &&
                b.paymentMode === "Cash" && (
                  <Typography
                    sx={{
                      mt: 1,
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    ✅ Cash Payment Confirmed
                  </Typography>
                )}

              {b.paymentStatus === "Unpaid" &&
                b.paymentMode === "Cash" && (
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="success"
                    onClick={() =>
                      confirmCashReceived(b.id)
                    }
                  >
                    Confirm Cash Received
                  </Button>
                )}

              {/* ✅ Online payment */}
              {b.paymentStatus === "Paid" &&
                b.paymentMode === "Online" && (
                  <Typography
                    sx={{
                      mt: 1,
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    ✅ Online Payment Successful
                  </Typography>
                )}
            </Paper>
          );
        })
      )}
    </Box>
  );
};

export default Payment;
