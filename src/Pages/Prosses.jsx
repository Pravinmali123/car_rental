import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
  {
    id: 1,
    title: "Choose Your Car",
    desc: "Browse through our wide range of cars and pick the one that suits your journey.",
    icon: <DirectionsCarIcon />,
  },
  {
    id: 2,
    title: "Fill Booking Form",
    desc: "Enter your name, email, and rental preferences in our quick booking form.",
    icon: <DescriptionIcon />,
  },
  {
    id: 3,
    title: "Start Your Journey",
    desc: "With everything ready, it's time to enjoy your ride.",
    icon: <CheckCircleIcon />,
  },
];

const Process = () => {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: "#f9fafb" }}>
      <Container maxWidth="lg">
      
        <Box textAlign="center" mb={{ xs: 4, md: 6 }}>
          <Typography fontWeight="bold" fontSize={{ xs: 24, md: 32 }}>
            How It Works
          </Typography>
          <Typography color="text.secondary" mt={1}>
            Follow these 3 simple steps to book your perfect ride.
          </Typography>
        </Box>

      
        <Grid container spacing={3} justifyContent="center">
          {steps.map((step) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              key={step.id}
            >
              <Card
                sx={{
                  height: "100%",
                  position: "relative",
                  borderRadius: 4,
                  pt: 6,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-6px)",
                  },
                }}
              >
          
                <Avatar
                  sx={{
                    bgcolor: "error.main",
                    width: 48,
                    height: 48,
                    position: "absolute",
                    top: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {step.icon}
                </Avatar>

              
                <Typography
                  sx={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "text.disabled",
                  }}
                >
                  Step {step.id}
                </Typography>

                <CardContent>
                  <Typography fontWeight="bold" fontSize={18} mb={1}>
                    {step.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    fontSize={14}
                    lineHeight={1.6}
                  >
                    {step.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Process;
