import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Footer from "../components/Footer";
import Logo1 from "/Logo1.png";

export default function SignInSide() {
  // state for manager user input and login
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const { currentUser, handleUpdateUser } = useUserContext();
  const navigate = useNavigate();

  // take to main feed if already signed in
  useEffect(() =>{
    if(currentUser.email) {
      navigate('/main');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validating user input
    if (userPassword.length < 5) {
      setSubmitResult("Password must be at least 5 characters long");
    } else if (userPassword === userEmail) {
      setSubmitResult("Password cannot be the same as email");
    } else {
      // successful password
      const data = { email: userEmail, password: userPassword };
      //connect to our api using fetch
      let result = await fetch(`http://localhost:8080/api/users/login`, {
        method: "POST", //specify the http method
        body: JSON.stringify(data), //the body is where the data is.  and stringify changes language to JSON
        headers: { "Content-Type": "application/json" }, //need to tell server what language we are speakiing.
      })
        .then((response) => response.json()) //convert back from json
        .then((data) => {
          //now we have the data
          // user not found, what to do?  display message that user is not found.  allow another login?
          if (data.result === 404) {
            setSubmitResult("Email does not exist");
          } else if (data.result === 200) {
            localStorage.setItem("user", JSON.stringify(data.data[0]));
            setSubmitResult("Successful Login");
            handleUpdateUser(data.data[0]);
            navigate("/main");
          } else if (data.result === 400) {
            setSubmitResult("Password is not correct");
          }
          console.log("post response", data.result);
          return data.result;
        });
      // setSubmitResult("Successful login");
      // handleUpdateUser({ email: userEmail });
      // navigate("/main"); //navigate to main page after succesful login
    }
  };

  if (currentUser.email) {
    return (
      <div>
        <p>Welcome {currentUser.email}!</p>
        <button onClick={() => handleUpdateUser({})}>Log Out</button>
      </div>
    );
  }

  return (
    <Grid container component="main" sx={{ height: "100vh", mt: 8 }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          minHeight: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={Logo1}
          alt="background"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ minHeight: "100vh" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {submitResult && <p>{submitResult}</p>}
            <Grid container>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box sx={{ mt: 8 }}>
              <Footer />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
