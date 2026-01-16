import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Toolbar,
  // Button
} from '@mui/material';
import {
  Dashboard,
  DirectionsCar,
  CalendarMonth,
  
  Payments,
  Settings,
  Logout,
  ChevronLeft,
  Menu,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Car } from "lucide-react";


const drawerWidth = 260;

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Dashboard, labelGuj: 'Dashboard', path: '/dashboard/DashboardHome' },
  { id: 'bookings', label: 'Bookings', icon: CalendarMonth, labelGuj: 'Booking Manage', path: '/dashboard/managebookings' },
  { id: 'addcars', label: 'Add Cars', icon: DirectionsCar, labelGuj: 'Add Cars', path: '/dashboard/add-cars' },
  { id: 'payments', label: 'Payments', icon: Payments, labelGuj: 'Payment', path: '/dashboard/payments' },
  { id: 'settings', label: 'Settings', icon: Settings, labelGuj: 'Setting', path: '/dashboard/settings' },
  { id: 'logout', label: 'Logout', icon: Logout, labelGuj: 'Logout' },
];


export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
const navigate = useNavigate();
const handleMenuClick = (item) => {
  if (item.id === 'logout') {
    localStorage.clear();
    navigate("/login");
    return;
  }

  navigate(item.path);
};


  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 72,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
          backgroundColor:"#f8f6f6"
        },
      }}
    >
      {/* Header */}
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
        }}
      >
        {open && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              sx={{
                bgcolor: '#f59e0b',
                width: 40,
                height: 40,
              }}
            >
              <Car size={36} color="white" style={{ fontSize: "40px" }} />
            </Avatar>
            <Typography variant="h6" fontWeight="bold" color="#f59e0b">
              Car Rental
            </Typography>
          </Box>
        )}
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Toolbar>

      <Divider />

      {/* Menu Items */}
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          // const isActive = activeTab === item.id;

          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                // selected={isActive}
                onClick={() => handleMenuClick(item)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'action.light',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:   '#f59e0b' ,
                    minWidth: 40,
                  }}
                >
                  <Icon />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.labelGuj}
                    primaryTypographyProps={{
                      fontWeight: 500,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mt: 'auto' }} />

      {/* User Profile */}
      {open && (
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'background.default',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#f59e0b',
                width: 40,
                height: 40,
              }}
            >
              A
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight="bold">
                Admin User
              </Typography>
              <Typography variant="caption" color="text.secondary">
                  {user.email}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}