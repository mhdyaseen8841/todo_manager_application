import React from "react";
import { Container, Grid2 as Grid, Typography,Box, Button } from "@mui/material";
import BasicCard from "../Components/ProjectCard";
const NotFound = () => {
  return (
    <>
      <Box className="mainHeading">
        <Typography
          variant="h5"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Error Page Not Found
        </Typography>

      
      </Box>
      
    </>
  );
};

export default NotFound;
