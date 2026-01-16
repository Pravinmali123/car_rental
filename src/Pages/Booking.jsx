import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
} from "@mui/material";

const Booking = ({ user, onLogout }) => {
  const [bookings, setBookings] = useState([]);

  // ✅ Load only logged-in user's bookings
  useEffect(() => {
    if (!user?.email) {
      setBookings([]);
      return;
    }

    const allBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const userBookings = allBookings.filter(
      (b) => b.userEmail === user.email
    );

    setBookings(userBookings);
  }, [user?.email]); // 🔥 important dependency

  // ✅ Cancel booking (only own)
  const cancelBooking = (id) => {
    const all =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const updated = all.filter((b) => b.id !== id);

    localStorage.setItem("bookings", JSON.stringify(updated));

    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" mb={4}>
          My Bookings
        </Typography>

        {bookings.length === 0 ? (
          <Typography>No bookings yet</Typography>
        ) : (
          bookings.map((b) => (
            <Paper
              key={b.id}
              sx={{
                p: 2,
                mb: 2,
                borderLeft:
                  b.status === "Approved"
                    ? "5px solid green"
                    : b.status === "Rejected"
                    ? "5px solid red"
                    : "5px solid orange",
              }}
            >
              <Typography fontWeight="bold" variant="h6">
                {b.car_name}
              </Typography>

              <Typography>Name: {b.name}</Typography>
              <Typography>Email: {b.userEmail}</Typography>
              <Typography>Mobile: {b.mobile}</Typography>

              <Divider sx={{ my: 1 }} />

              <Typography>
                Base Price: ₹{b.price} / day
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography>Status: {b.status}</Typography>

              {b.status === "Pending" && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => cancelBooking(b.id)}
                >
                  Cancel Booking
                </Button>
              )}
            </Paper>
          ))
        )}
      </Box>
    </Layout>
  );
};

export default Booking;
