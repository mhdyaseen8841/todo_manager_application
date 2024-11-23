import React, { useState,useEffect } from 'react';
import { Container , Typography, Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
 registerUser
} from "../service/userAuthAPI";

const SignUp = () => {
  const [email, setEmail] = useState('');
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


 const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password || !name){
      toast.error("enter name, email and password")
      return false;
    }
    console.log('Email:', email);
    registerUser({email,password,name}).then((res)=>{
      console.log(res)
      toast.success("user created Successfull, please do login")
      // localStorage.setItem('user', JSON.stringify(user));
      navigate('/login')

    }).catch((err)=>{
      console.log(err);
      toast.error(err.response.data.message);
    })
  };


  useEffect(()=>{
   if(localStorage.user){
    navigate('/')
   }
  },[])
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" align="center">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
                      label="Name"
                      type="text"
                      fullWidth
                      value={name}
                   
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            sx={{ mt: 2 }}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
            Sign up
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <a onClick={()=>navigate("/login")}><u>Login</u></a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;