import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainImage from "../assets/Main.jpg";

const Main = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${MainImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#000",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textShadow: "0 0 10px red, 0 0 20px red",
          marginBottom: 2,
        }}
      >
        Source Safe
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 4, color:"white" }}>
        Your first system to share and save your files securely.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#DFAA42",
            boxShadow: "0 0 10px red, 0 0 20px red",
            "&:hover": {
              backgroundColor: "#DFAA42",
            },
          }}
          onClick={() => navigate('/sign-in')}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#DFAA42",
            boxShadow: "0 0 10px red, 0 0 20px red",
            "&:hover": {
              backgroundColor: "#DFAA42",
            },
          }}
          onClick={() => navigate('/sign-up')}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Main;
