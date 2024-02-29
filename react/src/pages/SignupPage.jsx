import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";
import Logo2 from "/Logo2.png";

export default function SignupPage() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    fetch(`http://localhost:8080/api/users/create`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create account");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Account created:", data);
        setSuccessMessage(
          "Account created successfully! Redirecting to login..." // set success message on successful account creation
        );
        setTimeout(() => {
          navigate("/"); // Redirect to login page after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Failed to create account. Please try again."); // set error message on failure
      });
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: "white", borderRadius: "10px" }}
      >
        {/* Signup Form Grid */}
        <Grid item xs={4} maxWidth={6}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Create Username"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {successMessage && (
                <div style={{ color: "green", marginTop: "10px" }}>
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div style={{ color: "red", marginTop: "10px" }}>
                  {errorMessage}
                </div>
              )}
              <Grid container justifyContent="flex-end" sx={{ mb: 5 }}>
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* Image Grid */}
        <Grid item xs={6} md={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <img
              src={Logo2}
              alt="Logo2"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}
