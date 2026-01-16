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
import Managebooking from "./Dashboard/Managebooking";
import AddCars from "./Dashboard/Addcar";
import Payments from "./Dashboard/Payment";
import Settings from "./Dashboard/Setting";

function App() {
  // ✅ USER (refresh safe)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ BOOKINGS (GLOBAL & refresh safe)
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  // ✅ Persist bookings
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  // ✅ Persist user
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // ✅ Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isAuthenticated");
    // ⚠️ bookings intentionally NOT removed
    window.location.href = "/";
  };
  const cancelBooking = (bookingId) => {
  setBookings((prev) =>
    prev.map((b) =>
      b.id === bookingId
        ? { ...b, status: "Cancelled" }
        : b
    )
  );
};


  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
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
              cancelBooking={cancelBooking}
            />
          }
        />


        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/search"
          element={<Search user={user} onLogout={handleLogout} />}
        />

        <Route
          path="/menu"
          element={<Menu user={user} onLogout={handleLogout} />}
        />

        {/* Dashboard Layout (Nested Routes) */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout
              user={user}
              onLogout={handleLogout}
            />
          }
        >
          <Route
            index
            element={
              <Dashboard
                user={user}
                bookings={bookings}
                setBookings={setBookings}
              />
            }
          />
          <Route path="DashboardHome" element={<DashboardHome />} />
          
          <Route
            path="managebookings"
            element={
              <Managebooking
                bookings={bookings}
                setBookings={setBookings}
              />
            }
          />
          <Route path="add-cars" element={<AddCars />} />
          <Route path="payments" element={<Payments />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
