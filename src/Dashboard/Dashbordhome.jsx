import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";

const Dashboardhome = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const [availableCars, setAvailableCars] = useState(0);
  const [bookingCars, setBookingCars] = useState(0);
  const [revenue, setRevenue] = useState(0);

  // ✅ Logged-in user
  useEffect(() => {
    const raw = localStorage.getItem("loggedInUser");
    if (!raw) return;

    const data = JSON.parse(raw);
    setUserName(data.name || data.email);
  }, []);

  // ✅ Fetch users (API)
  useEffect(() => {
    const raw = localStorage.getItem("loggedInUser");
    if (!raw) return;

    const data = JSON.parse(raw);
    const token = "giFj2jhw3MD8UrH0";

    axios
      .get("https://generateapi.techsnack.online/api/create", {
        headers: { Authorization: token },
      })
      .then((res) => {
        const filteredUsers = res.data.Data.filter(
          (item) => item.email !== data.email
        );
        setUsers(filteredUsers);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
  console.log(
    "Cars:", JSON.parse(localStorage.getItem("cars")),
    "Bookings:", JSON.parse(localStorage.getItem("bookings"))
  );
}, []);


  // ✅ FRONTEND-ONLY Dashboard Calculations
  useEffect(() => {
const cars = JSON.parse(localStorage.getItem("cars")) || [];
const bookings = JSON.parse(localStorage.getItem("bookings")) || [];


    setAvailableCars(
      cars.filter((c) => c.status !== "Booked").length
    );

    const approvedBookings = bookings.filter(
      (b) => b.status === "Approved"
    );

    setBookingCars(approvedBookings.length);

    setRevenue(
      approvedBookings.reduce(
        (sum, b) => sum + Number(b.price || 0),
        0
      )
    );
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* HEADER */}
      <Box mb={4}>
        <Typography variant="h4">Welcome to Dashboard</Typography>
        <Typography variant="h5" color="text.secondary">
          Hello, {userName}
        </Typography>

        {/* DASHBOARD CARDS */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* TOTAL USERS */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => setShowUsers(!showUsers)}
            >
              <CardContent>
                <Typography fontWeight="bold">
                  Total Users: {users.length}
                </Typography>
                <Typography fontSize={12}>
                  Click to {showUsers ? "hide" : "view"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* AVAILABLE CARS */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: "#388e3c", color: "white" }}>
              <CardContent>
                <Typography fontWeight="bold">
                  Available Cars: {availableCars}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* BOOKING CARS */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: "#f57c00", color: "white" }}>
              <CardContent>
                <Typography fontWeight="bold">
                  Booking Cars: {bookingCars}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* REVENUE */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: "#d32f2f", color: "white" }}>
              <CardContent>
                <Typography fontWeight="bold">
                  Revenue Income: ₹ {revenue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* USERS LIST (TOGGLE) */}
      {showUsers && (
        <>
          <Typography variant="h6" mb={2}>
            Users List
          </Typography>

          <Grid container spacing={2}>
            {users.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item._id || index}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography fontWeight="bold">
                      {index + 1}. {item.firstName} {item.lastName}
                    </Typography>
                    <Typography color="text.secondary">
                      Email: {item.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Dashboardhome;
