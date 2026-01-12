import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Container,
  Stack,
} from "@mui/material";
import { Car, Phone, Mail, MapPin } from "lucide-react";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

const linkStyle = {
  color: "#d1d5db",
  mb: 1,
  cursor: "pointer",
  transition: "0.3s",
  "&:hover": {
    color: "#f59e0b",
    transform: "translateX(4px)",
  },
};

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#0f172a",
        py: { xs: 5, lg: 7 },
        borderTopLeftRadius: { xs: 22, lg: 44 },
        borderTopRightRadius: { xs: 22, lg: 44 },
      }}
    >
      <Container maxWidth="lg">
       
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",         
              md: "2.2fr 3fr",    
              lg: "2.2fr 3fr",    
            },
            gap: 4,
          }}
        >
          {/*  LOGO */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Car size={34} color="#f59e0b" />
              <Typography
                sx={{ fontSize: 28, fontWeight: 700, color: "#fff" }}
              >
                <span style={{ color: "#f59e0b" }}>Car</span>Rental
              </Typography>
            </Stack>

            <Typography
              sx={{
                mt: 2,
                color: "#cbd5e1",
                fontSize: 15,
                lineHeight: 1.7,
                maxWidth: 420,
              }}
            >
              Premium car rental service with a wide selection of luxury and
              everyday vehicles for all your driving needs.
            </Typography>

            <Stack direction="row" spacing={1.5} mt={3}>
              {[FacebookIcon, InstagramIcon, TwitterIcon, EmailIcon].map(
                (Icon, i) => (
                  <IconButton
                    key={i}
                    size="small"
                    sx={{
                      color: "#cbd5e1",
                      border: "1px solid #1e293b",
                      "&:hover": {
                        color: "#f59e0b",
                        borderColor: "#f59e0b",
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                )
              )}
            </Stack>
          </Box>

          {/*  QUICK + RESOURCES + CONTACT */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",           
                sm: "repeat(3, 1fr)",  
                md: "repeat(3, 1fr)",  
                lg: "repeat(3, 1fr)", 
              },
              gap: 4,
            }}
          >
            {/* QUICK LINKS */}
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 2, color: "#fff" }}>
                QUICK LINKS
              </Typography>
              {["Home", "Browse Cars", "List Your Car", "About Us"].map(
                (text) => (
                  <Typography key={text} sx={linkStyle}>
                    {text}
                  </Typography>
                )
              )}
            </Box>

            {/* RESOURCES */}
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 2, color: "#fff" }}>
                RESOURCES
              </Typography>
              {[
                "Help Center",
                "Terms of Service",
                "Privacy Policy",
                "Insurance",
              ].map((text) => (
                <Typography key={text} sx={linkStyle}>
                  {text}
                </Typography>
              ))}
            </Box>

            {/* CONTACT */}
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 2, color: "#fff" }}>
                Contact Us
              </Typography>

              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Phone size={18} color="#60A5FA" />
                  <Typography color="white">
                    +91 8469561982
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Mail size={18} color="#60A5FA" />
                  <Typography color="white">
                    carrental@email.com
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <MapPin size={18} color="#60A5FA" />
                  <Typography color="white">
                    Katargam, Surat, Gujarat
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* COPYRIGHT */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: "1px solid #1e293b",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: 13, color: "#94a3b8" }}>
            © {new Date().getFullYear()} CarRental. Designed & Developed by{" "}
            <span style={{ color: "#f59e0b" }}>Pravin Mali</span>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
