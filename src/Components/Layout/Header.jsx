import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  Drawer,
  ListItem,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CarRentalIcon from "@mui/icons-material/CarRental";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation } from "react-router-dom";

const navStyle = (active) => ({
  color: active ? "goldenrod" : "white",
  position: "relative",
  fontWeight: 500,

  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: -4,
    width: active ? "100%" : "0%",
    height: "2px",
    backgroundColor: "goldenrod",
    transition: "width 0.3s ease",
  },

  "&:hover": { color: "goldenrod" },
  "&:hover::after": { width: "100%" },
});

const drawerItemStyle = {
  position: "relative",
  fontWeight: 500,

  "&::after": {
    content: '""',
    position: "absolute",
    left: 16,
    bottom: 6,
    width: "0%",
    height: "2px",
    backgroundColor: "goldenrod",
    transition: "width 0.3s ease",
  },

  "&:hover::after": {
    width: "40%",
  },
};

const Header = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const toggleDrawer = () => setOpen(!open);

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/cars?search=${search}`);
    setSearch("");
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#131722ff" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LOGO */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.1 }}>
            <CarRentalIcon sx={{ color: "goldenrod", fontSize: 35 }} />
            <Typography
              sx={{
                fontSize: { xs: 18, sm: 20, md: 22 },
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.5px",
              }}
            >
              <span style={{ color: "#f59e0b" }}>Car</span>Rental
            </Typography>
          </Box>

          {/* DESKTOP MENU */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            {[
              { label: "Home", path: "/" },
              { label: "Cars", path: "/cars" },
              { label: "My Booking", path: "/booking" },
            ].map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={navStyle(location.pathname === item.path)}
              >
                {item.label}
              </Button>
            ))}

            {/* SEARCH */}
            <TextField
              size="small"
              placeholder="Search Cars"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                minWidth: 220,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* LOGOUT/DASHBOARD BUTTONS */}
            {user ? (
              <>
                <Button
                  onClick={onLogout}
                  variant="contained"
                  sx={{
                    bgcolor: "goldenrod",
                    color: "black",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#d4a017" },
                  }}
                >
                  Logout
                </Button>
                <Button
                  component={Link}
                  to="/dashboard"
                  variant="outlined"
                  sx={{
                    color: "goldenrod",
                    borderColor: "goldenrod",
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: "#d4a017",
                      bgcolor: "rgba(218, 165, 32, 0.1)",
                    },
                  }}
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                sx={{
                  bgcolor: "goldenrod",
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#d4a017" },
                }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* MOBILE ICON */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "white" }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 260, p: 2 }}>
          {[
            { label: "Home", path: "/" },
            { label: "Cars", path: "/cars" },
            { label: "My Booking", path: "/booking" },
          ].map((item) => (
            <ListItem
              key={item.label}
              component={Link}
              to={item.path}
              onClick={toggleDrawer}
              sx={drawerItemStyle}
            >
              {item.label}
            </ListItem>
          ))}

          {/* MOBILE LOGOUT/DASHBOARD */}
          {user ? (
            <>
              <Button
                onClick={() => {
                  onLogout();
                  toggleDrawer();
                }}
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "goldenrod",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Logout
              </Button>
              <Button
                component={Link}
                to="/dashboard"
                fullWidth
                variant="outlined"
                onClick={toggleDrawer}
                sx={{
                  mt: 1,
                  color: "goldenrod",
                  borderColor: "goldenrod",
                  fontWeight: "bold",
                }}
              >
                Dashboard
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              fullWidth
              variant="contained"
              onClick={toggleDrawer}
              sx={{
                mt: 2,
                bgcolor: "goldenrod",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;