import React from "react";
import Layout from "../Components/Layout/Layout";
import { Box, Typography, Paper } from "@mui/material";

const Booking = ({ user, onLogout, bookings = [] }) => {
  return (
    <Layout user={user} onLogout={onLogout}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" mb={4}>
          My Bookings
        </Typography>

        {bookings.length === 0 ? (
          <Typography>No bookings yet</Typography>
        ) : (
          bookings.map((b, i) => (
            <Paper
              key={i}
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
              <Typography fontWeight="bold">
                {b.carName}
              </Typography>
              <Typography>
                ₹{b.price} / day
              </Typography>
              <Typography>Status: {b.status}</Typography>
            </Paper>
          ))
        )}
      </Box>
    </Layout>
  );
};

export default Booking;
