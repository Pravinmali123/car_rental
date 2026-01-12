import Sidebar from "../../Pages/Dashboard";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
