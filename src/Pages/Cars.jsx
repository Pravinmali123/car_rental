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
  // NotebookText,
  LifeBuoy,
    User,
  IdCard,
  FileText,
  ShieldCheck,
  BookOpen,
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

  const token = "MjaxytJgh0X2hQxH";

  // ✅ Load cars + sync booking status
useEffect(() => {
  axios
    .get("https://generateapi.techsnack.online/api/autocar", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      const apiCars = res.data.Data || [];

      const bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

      // 🔴 ⬇️⬇️ આ code HERE paste કરો ⬇️⬇️
      const updatedCars = apiCars.map((car) => {
        const approvedBooking = bookings.find(
          (b) =>
            b.carId === car._id && b.status === "Approved"
        );

        return approvedBooking
          ? {
              ...car,
              status: "Booked",
              bookedTill: approvedBooking.endDate,
              waitingList: approvedBooking.waitingList || [],
            }
          : {
              ...car,
              status: car.status || "Available",
              waitingList: [],
            };
      });

      setCars(updatedCars);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);



const handleWaitingList = (car) => {
   if (!user) {
    navigate("/login");
    return;
  }
  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  const bookingIndex = bookings.findIndex(
    (b) => b.carId === car._id && b.status === "Approved"
  );

  if (bookingIndex === -1) return;

  const waitingList =
    bookings[bookingIndex].waitingList || [];

  const alreadyAdded = waitingList.includes(user.name);

  if (!alreadyAdded) {
    waitingList.push(user.name);
    bookings[bookingIndex].waitingList = waitingList;
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }

  // ✅ ONLY now show waiting list
  setShowWaitingFor(car._id);

  // UI update
  setCars((prev) =>
    prev.map((c) =>
      c._id === car._id
        ? { ...c, waitingList }
        : c
    )
  );
};
  const [showWaitingFor, setShowWaitingFor] = useState(null);



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
                console.log("IMAGE:", car.image);
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
  sx={{ objectFit: "cover" }}
  image={car.image || "/no-car.png"}
  onError={(e) => {
    e.target.src = "/no-car.png";
  }}
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

                                                    {isBooked && (
  <Typography color="white" fontSize={10} mt={0.3}>
    Last Date: {car.bookedTill}
  </Typography>
)}
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
                              {/* {car.rating} */}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" mt={1}>
                         <Typography fontSize={15}>
                          <User size={15} />{" "}
                          {car.car_owner}
                        </Typography>

                        <Typography fontSize={15}>
                          <MapPin size={15} />{" "}
                          {car.location}
                        </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          spacing={2}

                          mt={2}
                          flexWrap="wrap" 
                        >
                          <Typography fontSize={13}>
                            <Users size={14} />{" "}
                            {car.seats}
                          </Typography>
                          <Typography fontSize={13}>
                            <Cog size={14} />{""}
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
                            <ShieldCheck size={14} />{" "}
                            {car.insurance ||
                              "No Insurance"}
                          </Typography>

                            <Typography fontSize={13}>
                            <BookOpen size={14} />{" "}
                            {car.rc_book ||
                              "No RC Book"}
                          </Typography>
                          <Typography fontSize={13}>
                            <FileText size={14} />{" "}
                            {car.puc || "No PUC"}
                          </Typography>
                          <Typography fontSize={13}>
                            <IdCard size={14} />{" "}
                            {car.driving_license ||
                              "No Driving License"}
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
                        {isBooked && (
  <Button
    fullWidth
    sx={{ mt: 1 }}
    variant="outlined"
    color="warning"
    onClick={() => handleWaitingList(car)}
  >
    Join Waiting List
  </Button>
)}

                      </CardContent>
{showWaitingFor === car._id &&
  car.waitingList?.length > 0 && (
    <Box mt={2} px={2} pb={2} bgcolor="#f0f0f0" borderRadius={2}>
      <Typography fontWeight="bold" fontSize={14}>
        Waiting List:
      </Typography>
      {car.waitingList.map((name, index) => (
        <Typography key={index} fontSize={13}>
          • {name}
        </Typography>
      ))}
    </Box>
  )}


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
