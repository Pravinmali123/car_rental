import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Cars from "./Pages/Cars";
import Booking from "./Pages/Booking";
import Search from "./Pages/Search";
import Menu from "./Pages/Menu";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Pagenotfound from "./Pages/Pagenotfound";
import Dashboard from "./Pages/Dashboard";

import DashboardLayout from "./Components/Layout/Dashboardlayout";
import DashboardHome from "./Dashboard/Dashbordhome";
import ManageCars from "./Dashboard/ManageCars";
import Managebooking from "./Dashboard/Managebooking";
import AddCars from "./Dashboard/Addcar";
import Payments from "./Dashboard/Payment";
import Settings from "./Dashboard/Setting";


function App() {
  // localStorage thi user get karo on initial load
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [bookings, setBookings] = useState([]);

  // Logout function
  const handleLogout = () => {
     setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isAuthenticated");
    
    // Home page par jav ane reload karo
    window.location.href = "/";
  };

  // User change thay tyare localStorage update karo 
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Home user={user} onLogout={handleLogout} />} 
        />

        <Route
          path="/cars"
          element={
            <Cars
              user={user}
              onLogout={handleLogout}
              bookings={bookings}
              setBookings={setBookings}
            />
          }
        />

        <Route
          path="/booking"
          element={
            <Booking 
              user={user} 
              onLogout={handleLogout}
              bookings={bookings} 
            />
          }
        />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              user={user}
              onLogout={handleLogout}
              bookings={bookings}
              setBookings={setBookings}
            />
          }
        />

  <Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="managecars" element={<ManageCars />} />
  <Route path="managebookings" element={<Managebooking  bookings={bookings} setBookings={setBookings}/>}/>
  <Route path="add-cars" element={<AddCars />} />
  <Route path="payments" element={<Payments />} />
  <Route path="settings" element={<Settings />} />
</Route>

        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/search" 
          element={<Search user={user} onLogout={handleLogout} />} 
        />
        
        <Route 
          path="/menu" 
          element={<Menu user={user} onLogout={handleLogout} />} 
        />

        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;