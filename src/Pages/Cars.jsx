import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import Booknow from "../Pages/Booknow";

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
import { Car, MapPin, Users, Cog, Fuel, Star } from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

const initialCars = [
  {
    id: 1,
    name: "Tesla Model 3",
    year: 2023,
    location: "Surat",
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    price: 900,
    rating: 4.8,
    image: "/tesla.jpg",
  },
  {
    id: 2,
    name: "BMW X5",
    year: 2023,
    location: "Rajkot",
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 2500,
    rating: 4.7,
    image: "/bmw.jpg",
  },
  {
    id: 3,
    name: "TOYATA X5",
    year: 2023,
    location: "Mumbai",
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 2100,
    rating: 4.6,
    status: "Available",
    image: "/toyata.jpg",
  },
  {
    id: 4,
    name: "KIA x1",
    year: 2024,
    location: "Vadodara",
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 3000,
    rating: 4.3,
    status: "Available",
    image: "/kia.jpg",
  },
  {
    id: 5,
    name: "FORD y3",
    year: 2025,
    location: "Amedabad",
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 4000,
    rating: 4.9,
    status: "Available",
    image: "/ford.jpg",
  },
  {
    id: 6,
    name: "AUDI model 3",
    year: 2025,
    location: "Palanpur",
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 5000,
    rating: 5.0,
    status: "Available",
    image: "/audi.jpg",
  },
  {
    id: 7,
    name: "EV car",
    year: 2024,
    location: "Surat",
    seats: 5,
    transmission: "Automatic",
    fuel: "EV",
    price: 3000,
    rating: 4.9,
    status: "Available",
    image: "/ev1.jpg",
  },
  {
    id: 8,
    name: "HONDA y3",
    year: 2020,
    location: "Amedabad",
    seats: 4,
    transmission: "Automatic",
    fuel: "CNG",
    price: 3100,
    rating: 4.9,
    status: "Available",
    image: "/cng1.jpg",
  },
];

const Cars = ({ user, onLogout, bookings = [], setBookings }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("search") || "";
  const selectedCity = location.state?.city || "";

  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const filteredCars = initialCars.filter((car) => {
    const matchSearch =
      !query ||
      car.name.toLowerCase().includes(query.toLowerCase()) ||
      car.location.toLowerCase().includes(query.toLowerCase()) ||
      car.fuel.toLowerCase().includes(query.toLowerCase());

    const matchCity =
      !selectedCity ||
      car.location.toLowerCase() === selectedCity.toLowerCase();

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookingConfirm = (bookingData) => {
    setBookings((prev) => [...prev, bookingData]);
    alert("Booking Confirmed ✅");
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
            <Car size={32} /> Featured Cars
          </Typography>

          <Grid container spacing={3}>
            {filteredCars.length === 0 ? (
              <Typography align="center" color="white" fontSize={18}>
                No cars found
              </Typography>
            ) : (
              filteredCars.map((car) => {
                const isBooked = bookings.some((b) => b.carId === car.id);

                return (
                  <Grid item xs={12} md={6} lg={4} key={car.id}>
                    <Card sx={{ borderRadius: 3 }}>
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="220"
                          image={car.image}
                          sx={{
                            filter: isBooked ? "grayscale(100%)" : "none",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            bgcolor: isBooked ? "red" : "green",
                            color: "white",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          {isBooked ? "Booked" : "Available"}
                        </Box>
                      </Box>

                      <CardContent>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography fontWeight="bold">{car.name}</Typography>
                          <Stack direction="row" spacing={0.5}>
                            <Star size={16} color="gold" />
                            <Typography>{car.rating}</Typography>
                          </Stack>
                        </Stack>

                        <Typography fontSize={14}>
                          <MapPin size={14} /> {car.location}
                        </Typography>

                        <Stack direction="row" spacing={2} mt={1}>
                          <Typography fontSize={13}>
                            <Users size={14} /> {car.seats}
                          </Typography>
                          <Typography fontSize={13}>
                            <Cog size={14} /> {car.transmission}
                          </Typography>
                          <Typography fontSize={13}>
                            <Fuel size={14} /> {car.fuel}
                          </Typography>
                        </Stack>

                        <Typography mt={2} fontWeight="bold">
                           ₹{car.price} / day
                        </Typography>

                        <Button
                          fullWidth
                          sx={{ mt: 2 }}
                          variant="contained"
                          color={isBooked ? "error" : "success"}
                          disabled={isBooked}
                          onClick={() => handleOpen(car)}
                        >
                          {isBooked ? "Booked" : "Book Now"}
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
          />
        </Container>
      </Box>
    </Layout>
  );
};

export default Cars;