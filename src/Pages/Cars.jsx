import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import Booknow from "../Pages/Booknow";
import axios from "axios";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

import {
  Car,
  MapPin,
  Users,
  Cog,
  Fuel,
  Star,
  NotebookText,
  LifeBuoy,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

const Cars = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("search") || "";
  const selectedCity = location.state?.city || "";

  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const token = "jRJivHXvU6JgsB9y";

  // ✅ Load cars + sync booking status
  useEffect(() => {
    axios
      .get("https://generateapi.techsnack.online/api/caradd", {
        headers: { Authorization: token },
      })
      .then((res) => {
        let apiCars = res.data.Data || [];

        // 🔥 Sync with approved bookings (refresh safe)
        const bookings =
          JSON.parse(localStorage.getItem("bookings")) || [];

        const updatedCars = apiCars.map((car) => {
          const approvedBooking = bookings.find(
            (b) =>
              b.carId === car._id && b.status === "Approved"
          );
          return approvedBooking
            ? { ...car, status: "Booked" }
            : { ...car, status: car.status || "Available" };
        });

        setCars(updatedCars);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Filter cars
  const filteredCars = cars.filter((car) => {
    const matchSearch =
      !query ||
      car.car_name?.toLowerCase().includes(query.toLowerCase()) ||
      car.location?.toLowerCase().includes(query.toLowerCase()) ||
      car.fuel?.toLowerCase().includes(query.toLowerCase());

    const matchCity =
      !selectedCity ||
      car.location?.toLowerCase() === selectedCity.toLowerCase();

    return matchSearch && matchCity;
  });

  const handleOpen = (car) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSelectedCar(car);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // ✅ Booking confirm (Pending only)
  const handleBookingConfirm = (bookingData) => {
    const existing =
      JSON.parse(localStorage.getItem("bookings")) || [];

    existing.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(existing));

    // alert("Booking sent for approval (Pending)");
    handleClose();
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <Box sx={{ bgcolor: "#70757e", py: 8 }}>
        <Container maxWidth="xl">
          <Typography
            textAlign="center"
            fontSize="2rem"
            fontWeight="bold"
            color="orange"
            mb={4}
          >
            <Car size={32} /> Cars List
          </Typography>

          <Grid container spacing={3}>
            {filteredCars.length === 0 ? (
              <Typography align="center" color="white">
                No cars found
              </Typography>
            ) : (
              filteredCars.map((car) => {
                const isBooked = car.status === "Booked";

                return (
                  <Grid
                    key={car._id}
                    size={{ xs: 12, md: 6, lg: 4 }}
                  >
                    <Card sx={{ borderRadius: 3 }}>
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="220"
                          image={car.image}
                          onError={(e) =>
                            (e.target.src = "/no-car.png")
                          }
                        />

                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            bgcolor: isBooked
                              ? "red"
                              : "green",
                            color: "white",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          {isBooked
                            ? "Booked"
                            : "Available"}
                        </Box>
                      </Box>

                      <CardContent>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                        >
                          <Typography fontWeight="bold">
                            {car.car_name}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={0.5}
                          >
                            <Star
                              size={16}
                              color="gold"
                            />
                            <Typography>
                              {car.rating}
                            </Typography>
                          </Stack>
                        </Stack>

                        <Typography fontSize={14}>
                          <MapPin size={14} />{" "}
                          {car.location}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={2}
                          mt={1}
                          flexWrap="wrap"
                        >
                          <Typography fontSize={13}>
                            <Users size={14} />{" "}
                            {car.seats}
                          </Typography>
                          <Typography fontSize={13}>
                            <Cog size={14} />{" "}
                            {car.transmission}
                          </Typography>
                          <Typography fontSize={13}>
                            <Fuel size={14} />{" "}
                            {car.fuel}
                          </Typography>
                          <Typography fontSize={13}>
                            <LifeBuoy size={14} />{" "}
                            {car.driver ||
                              "No Driver"}
                          </Typography>
                          <Typography fontSize={13}>
                            <NotebookText size={14} />{" "}
                            {car.insurance ||
                              "No Insurance"}
                          </Typography>
                        </Stack>

                        <Typography
                          mt={2}
                          fontWeight="bold"
                        >
                          ₹ {car.price} / day
                        </Typography>

                        <Button
                          fullWidth
                          sx={{ mt: 2 }}
                          variant="contained"
                          color={
                            isBooked
                              ? "error"
                              : "success"
                          }
                          disabled={isBooked}
                          onClick={() =>
                            handleOpen(car)
                          }
                        >
                          {isBooked
                            ? "Booked"
                            : "Book Now"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>

          <Booknow
            open={open}
            onClose={handleClose}
            selectedCar={selectedCar}
            onConfirm={handleBookingConfirm}
            user={user}
          />
        </Container>
      </Box>
    </Layout>
  );
};

export default Cars;
