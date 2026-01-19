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
  }, [user?.email]);

  // ❌ Cancel booking
  const cancelBooking = (id) => {
    const all =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const updated = all.filter((b) => b.id !== id);

    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  //  CASH PAYMENT
  const handleCashPayment = (id) => {
    // const all =
    //   JSON.parse(localStorage.getItem("bookings")) || [];

    // const updated = all.map((b) =>
    //   b.id === id
    //     ? {
    //         ...b,
    //         paymentStatus: "Cash",
    //         paymentMode: "Cash",
    //       }
    //     : b
    // );

    // localStorage.setItem("bookings", JSON.stringify(updated));
    // setBookings(updated.filter((b) => b.userEmail === user.email));
  };

  //  ONLINE PAYMENT (Dummy – Razorpay later)
  const handleOnlinePayment = (id) => {
    // alert("Redirecting to online payment...");

    // const all =
    //   JSON.parse(localStorage.getItem("bookings")) || [];

    // const updated = all.map((b) =>
    //   b.id === id
    //     ? {
    //         ...b,
    //         paymentStatus: "Paid",
    //         paymentMode: "Online",
    //       }
    //     : b
    // );

    // localStorage.setItem("bookings", JSON.stringify(updated));
    // setBookings(updated.filter((b) => b.userEmail === user.email));
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

              {/*  Pending → Cancel */}
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

              {/* ✅ Approved → Payment Buttons */}
              {b.status === "Approved" &&
                b.paymentStatus !== "Paid" && (
                  <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleCashPayment(b.id)
                      }
                    >
                      Pay Cash
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleOnlinePayment(b.id)
                      }
                    >
                      Pay Now
                    </Button>
                  </Box>
                )}

              {/* ✅ Paid */}
         {/* {b.paymentStatus === "Paid" &&
  b.paymentMode === "Online" && (
    <Typography
      sx={{
        mt: 2,
        color: "green",
        fontWeight: "bold",
      }}
    >
      Payment Done (Online)
    </Typography>
)} */}

            </Paper>
          ))
        )}
      </Box>
    </Layout>
  );
};

export default Booking;
