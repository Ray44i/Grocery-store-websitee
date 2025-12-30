import React from "react";
import { Box, Typography } from "@mui/material";

export default function HomeGifStrip() {
  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100%",
        py: 4,
        background: "linear-gradient(90deg, #f1f8e9, #e8f5e9)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={800}
        textAlign="center"
        mb={3}
      >
        shop with GreenKet 🌱
      </Typography>

      {/* MOVING STRIP */}
      <Box
        sx={{
          display: "flex",
          gap: 6,
          width: "max-content",
          animation: "scroll 25s linear infinite",
        }}
      >
        {[
          "/images/home/banana.gif",
          "/images/home/fresh.gif",
          "/images/home/naga.gif",
            "/images/home/ciucamber.gif",
             "/images/home/eggs.gif", 
          "/images/home/happy.gif",
         "/images/home/milk.gif",
         "/images/home/avokado.gif",
        "/images/home/vagies.gif",
        "/images/home/fasola.gif",
        "/images/home/delivery.gif",
        ].map((src, index) => (
          <Box
            key={index}
            sx={{
              minWidth: 220,
              textAlign: "center",
            }}
          >
            <img
              src={src}
              alt="feature"
              style={{
                height: 120,
                borderRadius: 16,
              }}
            />
          </Box>
        ))}
      </Box>

      {/* CSS animation */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </Box>
  );
}
