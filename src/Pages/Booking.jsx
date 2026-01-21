import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import { useRazorpay } from "react-razorpay";

const Booking = ({ user, onLogout }) => {
  const [bookings, setBookings] = useState([]);
  const [processingId, setProcessingId] = useState(null);
  const { Razorpay } = useRazorpay();

  //  SAFE total days calculation
  const calculateDays = (start, end) => {
    if (!start || !end) return 1;

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime())
    ) {
      return 1;
    }

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    return (
      (endDate - startDate) /
        (1000 * 60 * 60 * 24) +
      1
    );
  };

  // Load bookings
  useEffect(() => {
    if (!user?.email) {
      setBookings([]);
      return;
    }

    const all =
      JSON.parse(localStorage.getItem("bookings")) || [];

    setBookings(
      all.filter((b) => b.userEmail === user.email)
    );
  }, [user?.email]);

  // Cancel booking
  const cancelBooking = (id) => {
    const all =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const updated = all.filter((b) => b.id !== id);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Cash payment
  const handleCashPayment = (id) => {
    const all =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const updated = all.map((b) =>
      b.id === id
        ? { ...b, paymentStatus: "Paid", paymentMode: "Cash" }
        : b
    );

    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated.filter((b) => b.userEmail === user.email));
  };

  // Online payment
  const handleOnlinePayment = (id, totalPrice) => {
    setProcessingId(id);

    const options = {
      key: "rzp_test_S5iwtFr5Ws0PGC",
      amount: totalPrice * 100,
      currency: "INR",
      name: "Car Rental",
      description: "Car Booking Payment",

      handler: () => {
        const all =
          JSON.parse(localStorage.getItem("bookings")) || [];

        const updated = all.map((b) =>
          b.id === id
            ? {
                ...b,
                paymentStatus: "Paid",
                paymentMode: "Online",
              }
            : b
        );

        localStorage.setItem("bookings", JSON.stringify(updated));
        setBookings(updated.filter((b) => b.userEmail === user.email));
        setProcessingId(null);
      },

      modal: {
        ondismiss: () => setProcessingId(null),
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
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
          bookings.map((b) => {
            const totalDays = calculateDays(b.startDate, b.endDate);
            const totalPrice = totalDays * Number(b.price || 0);

            return (
              <Paper key={b.id} sx={{ p: 2, mb: 2 }}>
                <Typography fontWeight="bold" variant="h6">
                  {b.car_name}
                </Typography>

                <Typography>Email: {b.userEmail}</Typography>
                <Typography>Mobile: {b.mobile}</Typography>

                <Divider sx={{ my: 1 }} />

                <Typography>Base Price: ₹{b.price} / day</Typography>
                <Typography>Total Days: {totalDays}</Typography>
                <Typography fontWeight="bold">
                  Total Price: ₹{totalPrice}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography>Status: {b.status}</Typography>

                {b.status === "Pending" && (
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="error"
                    onClick={() => cancelBooking(b.id)}
                  >
                    Cancel Booking
                  </Button>
                )}

                {b.status === "Approved" &&
                  b.paymentStatus !== "Paid" && (
                    <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                      <Button
                        variant="contained"
                        color="success"
                        disabled={processingId === b.id}
                        onClick={() => handleCashPayment(b.id)}
                      >
                        Pay Cash
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        disabled={processingId === b.id}
                        onClick={() =>
                          handleOnlinePayment(b.id, totalPrice)
                        }
                      >
                        {processingId === b.id
                          ? "Processing..."
                          : `Pay Now ₹${totalPrice}`}
                      </Button>
                    </Box>
                  )}

                {b.paymentStatus === "Paid" && (
                  <Typography sx={{ mt: 2, color: "green", fontWeight: "bold" }}>
                    ✅ Payment Successful ({b.paymentMode})
                  </Typography>
                )}
              </Paper>
            );
          })
        )}
      </Box>
    </Layout>
  );
};

export default Booking;
