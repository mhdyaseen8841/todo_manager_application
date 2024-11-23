import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../service/userAuthAPI";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("enter email and password");
      return false;
    }
    console.log("Email:", email);
    loginUser({ email, password })
      .then((res) => {
        toast.success("login Successfull");
        localStorage.setItem("username", res.data.name);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/");
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" align="center">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
            Log In
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")}>
              <u>Sign Up</u>
            </a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
