import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import Layout from "../Components/Layout/Layout";
import axios from "axios";

import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  Stack,
  CircularProgress,
} from "@mui/material";

import { Car, User, Mail, Lock } from "lucide-react";

const Register = () => {
  useEffect(() => {
    ScrollReveal().reveal(".reveal-x", {
      origin: "left",
      distance: "100px",
      duration: 1500,
      easing: "ease-in-out",
      reset: false,
    });
  
  }, []);

  const API_TOKEN = "giFj2jhw3MD8UrH0";

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept terms & conditions"
    ),
  });

const handleRegister = (
  values,
  { resetForm, setSubmitting, setStatus }
) => {
  axios
    .post(
      "https://generateapi.techsnack.online/api/create",
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,

      },
      {
        headers: {
          Authorization: API_TOKEN,
        },
      }
    )
 .then((res) => {
  const userData = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password, // ⚠️ production માં save ન કરશો
  };

  // 1️⃣ Get existing users array
  const existingUsers =
    JSON.parse(localStorage.getItem("users")) || [];

  // 2️⃣ Add new user
  existingUsers.push(userData);

  // 3️⃣ Save back as array
  localStorage.setItem("users", JSON.stringify(existingUsers));

  alert("✅ Account created successfully");
  resetForm();
  window.location.href = "/login";
})

    .catch((error) => {
      setStatus(
        error.response?.data?.message || "Registration failed"
      );
    })
    .finally(() => {
      setSubmitting(false);
    });
};


  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #a1a8b2ff, #1c1d21ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
           py: {xs:"6px", sm:"7px", md:"12px"},
        }}
      >
        <Container maxWidth="sm">
          {/* Logo */}
          <Stack alignItems="center" mb={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Car size={36} color="#f59e0b" sx={{fontSize: { xs: 25, sm: 30, md: 35 }}}/>
              <Typography variant="h4" fontWeight="bold" color="#f59e0b" sx={{fontSize: { xs: 25, sm: 30, md: 35 }}}>
                AutoRent
              </Typography>
            </Stack>
          </Stack>

          <Paper elevation={6} className="reveal-x" sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Create Account
            </Typography>

            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              Join thousands of happy customers
            </Typography>

          
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                terms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
                status,
              }) => (
                <form onSubmit={handleSubmit}>
                  {status && (
                    <Typography textAlign="center" color="primary" mb={2}>
                      {status}
                    </Typography>
                  )}

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        placeholder="First Name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        error={
                          touched.firstName &&
                          Boolean(errors.firstName)
                        }
                        helperText={
                          touched.firstName && errors.firstName
                        }
                        InputProps={{
                          startAdornment: (
                            <User
                              size={18}
                              style={{ marginRight: 8 }}
                            />
                          ),
                        }}
                      />
                    </Grid>

                   <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        placeholder="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        error={
                          touched.lastName &&
                          Boolean(errors.lastName)
                        }
                        helperText={
                          touched.lastName && errors.lastName
                        }
                        InputProps={{
                          startAdornment: (
                            <User
                              size={18}
                              style={{ marginRight: 8 }}
                            />
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <Mail
                          size={18}
                          style={{ marginRight: 8 }}
                        />
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    error={
                      touched.password &&
                      Boolean(errors.password)
                    }
                    helperText={
                      touched.password && errors.password
                    }
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <Lock
                          size={18}
                          style={{ marginRight: 8 }}
                        />
                      ),
                    }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        name="terms"
                        checked={values.terms}
                        onChange={handleChange}
                      />
                    }
                    label="I agree to terms & conditions"
                  />
                  {touched.terms && errors.terms && (
                    <Typography fontSize={12} color="error">
                      {errors.terms}
                    </Typography>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ mt: 2 ,backgroundColor:"#f59e0b"}}
                  >
                    {isSubmitting ? (
                     <CircularProgress size={24} sx={{ color: "#f59e0b" }} />

                    ) : (
                      "Register"
                    )}
                  </Button>
                </form>
              )}
            </Formik>

            <Typography textAlign="center" mt={3}>
              Already have an account?{" "}
              <a href="/login" style={{ color: "#f59e0b" }}>
                Login
              </a>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default Register;
