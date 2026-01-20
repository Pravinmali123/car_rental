import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../Components/Layout/Layout";
import "../App.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import Brands from "./Brand";
import Process from "./Prosses";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Slider Data
const heroData = [
  { id: 1, image: "/wed1.jpg", title: "Wedding Cars" },
  { id: 2, image: "/fami1.jpg", title: "Family Cars" },
  { id: 3, image: "/cng1.jpg", title: "CNG Cars" },
  { id: 4, image: "/ev1.jpg", title: "EV Cars" },
  { id: 5, image: "/about.jpg", title: "Petrol Cars" },
];

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  return (
    <Layout user={user} onLogout={onLogout}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #70757e 60%, #f4f5f8ff 100%)",
          py: { xs: 4, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          {/* ===== Heading ===== */}
          <Typography
            align="center"
            sx={{
              fontSize: { xs: 28, sm: 38, md: 52 },
              fontFamily: "'Permanent Marker', cursive",
              color: "#f59e0b",
              textShadow:
                "2px 2px 0 rgba(0,0,0,0.4),4px 4px 10px rgba(0,0,0,0.3)",
              mb: 2,
            }}
          >
            Find Your Perfect Rental Car
          </Typography>

          <Typography align="center" sx={{ color: "#cbd5e1", mb: 5 }}>
            Discover amazing deals on quality vehicles. Book now and drive away
            with confidence.
          </Typography>

          {/* Search Box */}
          <Paper
            elevation={6}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              maxWidth: 1000,
              mx: "auto",
            }}
          >
            <Grid container spacing={2} alignItems="flex-end">
              {/* Pickup Location */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Typography fontSize={15} fontWeight={600} mb={1}>
                  <LocationOnIcon fontSize="small" /> Pickup Location
                </Typography>
                <TextField
                  // select
                  placeholder="Pikup Location"
                  fullWidth
                  size="small"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {/* <MenuItem value="">Select city</MenuItem>
                  <MenuItem value="Surat">SURAT</MenuItem>
                  <MenuItem value="Rajkot">RAJKOT</MenuItem>
                  <MenuItem value="Mumbai">MUMBAI</MenuItem> */}
                </TextField>
              </Grid>

              {/* Pickup Date */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Typography fontSize={14} fontWeight={600} mb={1}>
                  <CalendarMonthIcon fontSize="small" /> Pickup Date
                </Typography>
                <TextField type="date" fullWidth size="small" />
              </Grid>

              {/* Pickup Time */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Typography fontSize={14} fontWeight={600} mb={1}>
                  <AccessTimeIcon fontSize="small" /> Pickup Time
                </Typography>
                <TextField type="time" fullWidth size="small" />
              </Grid>

              {/* Return Date */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Typography fontSize={14} fontWeight={600} mb={1}>
                  <CalendarMonthIcon fontSize="small" /> Return Date
                </Typography>
                <TextField type="date" fullWidth size="small" />
              </Grid>

              {/* Button */}
              <Grid item xs={12} md={2.4}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: "orange" }}
                  onClick={() => {
                    if (!city) {
                      alert("Please select city");
                      return;
                    }
                    navigate("/cars", { state: { city } });
                  }}
                >
                  <SearchIcon />
                  Search Cars
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Stats */}
          <Grid
            container
            spacing={5}
            mt={8}
            mb={5}
            justifyContent="center"
            textAlign="center"
          >
            {[
              { value: "500+", label: "Premium Cars" },
              { value: "50+", label: "Locations" },
              { value: "24/7", label: "Support" },
              { value: "99%", label: "Satisfaction" },
            ].map((item, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  color="orange"
                  sx={{
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem",
                      md: "3rem",
                    },
                  }}
                >
                  {item.value}
                </Typography>

                <Typography sx={{ color: "#e5e7eb" }}>
                  {item.label}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* ===== Slider ===== */}
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            effect="fade"
            loop
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
          >
            {heroData.map((hero) => (
              <SwiperSlide key={hero.id}>
                <Box
                  sx={{
                    minHeight: { xs: "60vh", md: "80vh" },
                    backgroundImage: `linear-gradient(rgba(160, 72, 72, 0.6),rgba(0,0,0,.3)),url(${hero.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    borderRadius: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "orange",
                      fontSize: { xs: 16, sm: 32, md: 50 },
                      fontWeight: 600,
                      px: { xs: 2, sm: 0 },
                      textShadow: "0 4px 12px rgba(0,0,0,0.7)",
                    }}
                  >
                    {hero.title}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>

      <Brands />
      <Process />
    </Layout>
  );
};

export default Home;