import React, { useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Paper,
  CircularProgress,
} from "@mui/material";

import { Mail, Lock, Car } from "lucide-react";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    ScrollReveal().reveal(".reveal-x-alt", {
      origin: "right",
      distance: "100px",
      duration: 1500,
      easing: "ease-in-out",
      reset: false,
    });
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      navigate("/Dashboard", { replace: true });
    }
  }, [navigate]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const API_TOKEN = "giFj2jhw3MD8UrH0";

  const handleLogin = (values, { resetForm, setSubmitting }) => {
    if (values.email === "" || values.password === "") {
      alert("Fill up data");
      setSubmitting(false);
      return;
    }

    axios
      .get("https://generateapi.techsnack.online/api/create", {
        headers: {
          Authorization: API_TOKEN,
        },
      })
      .then((res) => {
        const userFound = res.data.Data.filter(
          (item) =>
            item.email === values.email && item.password === values.password
        );
        if (userFound.length > 0) {
          const userData = {
            email: values.email,
            name: userFound[0].name || values.email.split("@")[0],
            loginTime: new Date().toISOString(),
          };

          // Set user in App state (this will trigger Header update)
          setUser(userData);

          // Also save to localStorage
          localStorage.setItem("loggedInUser", JSON.stringify(userData));
          localStorage.setItem("isAuthenticated", "true");

          alert("Login Successful");
          resetForm();
          navigate("/");
        } else {
          alert("Wrong username or password");
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed. Please try again.");
        setSubmitting(false);
      });
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #a1a8b2ff, #1c1d21ff)",
          py: { xs: "6px", sm: "7px", md: "12px" },
        }}
      >
        <Container maxWidth="sm">
          {/* Logo */}
          <Box textAlign="center" mb={3}>
            <Stack direction="row" justifyContent="center" spacing={1}>
              <Car size={36} color="#f59e0b" style={{ fontSize: "36px" }} />
              <Typography
                variant="h4"
                fontWeight="bold"
                color="#f59e0b"
                sx={{ fontSize: { xs: 25, sm: 30, md: 35 } }}
              >
                AutoRent
              </Typography>
            </Stack>
          </Box>

          {/* Card */}
          <Paper
            elevation={8}
            className="reveal-x-alt"
            sx={{ p: 4, borderRadius: 3 }}
          >
            <Typography variant="h5" textAlign="center" fontWeight="bold">
              Welcome Back
            </Typography>
            <Typography textAlign="center" color="text.secondary" mb={3}>
              Sign in to your account
            </Typography>

            {/* Formik */}
            <Formik
              initialValues={{ email: "", password: "", remember: false }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      InputProps={{
                        startAdornment: (
                          <Mail size={18} style={{ marginRight: 8 }} />
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      name="password"
                      type="password"
                      label="Password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        startAdornment: (
                          <Lock size={18} style={{ marginRight: 8 }} />
                        ),
                      }}
                    />

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="remember"
                            checked={values.remember}
                            onChange={handleChange}
                          />
                        }
                        label="Remember me"
                      />

                      <Typography
                        component="a"
                        href="#"
                        color="#f59e0b"
                        fontSize={14}
                        sx={{ textDecoration: "none" }}
                      >
                        Forgot password?
                      </Typography>
                    </Stack>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      sx={{
                        py: 1.2,
                        backgroundColor: "#f59e0b",
                        "&:hover": {
                          backgroundColor: "#d97706",
                        },
                      }}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>

            <Typography textAlign="center" fontSize={14} mt={3}>
              Don't have an account?{" "}
              <Typography
                component="a"
                href="/register"
                color="#f59e0b"
                sx={{ textDecoration: "none", fontWeight: 500 }}
              >
                Sign up
              </Typography>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default Login;