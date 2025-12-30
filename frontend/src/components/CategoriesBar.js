import React from "react";
import { Box, Typography } from "@mui/material";

import AppleIcon from "@mui/icons-material/Apple";
import GrassIcon from "@mui/icons-material/Grass";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import CookieIcon from "@mui/icons-material/Cookie";
import FaceIcon from "@mui/icons-material/Face";

import CategoryCard from "./CategoryCard";

const categoryMap = [
  { name: "Fruits", icon: <AppleIcon />, path: "/category/fruits" },
  { name: "Vegetables", icon: <GrassIcon />, path: "/category/vegetables" },
  { name: "Dairy", icon: <LocalPizzaIcon />, path: "/category/dairy" },
  { name: "Bakery", icon: <BakeryDiningIcon />, path: "/category/bakery" },
  { name: "Snacks", icon: <CookieIcon />, path: "/category/snacks" },
  { name: "Self Care", icon: <FaceIcon />, path: "/category/self-care" },
];

export default function CategoriesBar({ sticky = false }) {
  return (
    <Box
      sx={{
        mb: 5,
        position: sticky ? "sticky" : "static",
        top: sticky ? 80 : "auto",
        zIndex: 18,
        bgcolor: "#f5faef",
        py: 4,
        overflow: "visible",
      }}
    >
      <Typography variant="h5" fontWeight={700} textAlign="center" mb={4}>
        GREENKET&apos;S CATEGORIES
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: { xs: "flex-start", md: "center" },
          overflowX: "auto",
          overflowY: "visible",
          px: 3,
          pb: 3,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {categoryMap.map((cat, i) => (
          <CategoryCard key={i} {...cat} compact={sticky} />
        ))}
      </Box>
    </Box>
  );
}
