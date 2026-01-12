import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Stack,
  
} from "@mui/material";

import {
  SiBmw,
  SiFord,
  SiMercedes,
  SiVolkswagen,
  SiTesla,
  SiPorsche,
} from "react-icons/si";

const brands = [
  { name: "BMW", icon: <SiBmw size={32} /> },
  { name: "Ford", icon: <SiFord size={44} /> },
  { name: "Mercedes Benz", icon: <SiMercedes size={32} /> },
  { name: "Volkswagen", icon: <SiVolkswagen size={32} /> },
  { name: "Tesla", icon: <SiTesla size={32} /> },
  { name: "Porsche", icon: <SiPorsche size={32} /> },
];

const Brands = () => {
  return (
    <Box sx={{ bgcolor: "#f9fafb", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl">
        {/* Heading */}
        <Stack
          direction="row"
          justifyContent="center"          alignItems="center"
          mb={5}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
          >
            Explore Our Premium Brands
          </Typography>

        </Stack>

        
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          {brands.map((brand) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              key={brand.name}
              display="flex"
              justifyContent="center"
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 180,
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: 1,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <Stack spacing={1.5} alignItems="center">
                  <Box sx={{ color: "text.primary" }}>
                    {brand.icon}
                  </Box>
                  <Typography fontSize={14} fontWeight={500}>
                    {brand.name}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Brands;
