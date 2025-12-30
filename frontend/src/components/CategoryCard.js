import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function CategoryCard({
  name,
  icon,
  path,
  compact = false,
}) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Box
      component={Link}
      to={path}
      aria-label={`Go to ${name} category`}
      sx={{
        textDecoration: "none",
        cursor: "pointer",

        /* SIZE */
        height: compact
          ? { xs: 80, sm: 90 }
          : { xs: 140, sm: 155, md: 165 },
        width: compact
          ? { xs: 80, sm: 90 }
          : { xs: 140, sm: 155, md: 165 },

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: compact ? 0.5 : 1.2,

        borderRadius: 4,

        /* =========================
           BASE STATE
           ========================= */
        backgroundColor: compact
          ? isActive
            ? "#f1ffd9"
            : "transparent"
          : isActive
          ? "#f8ffef"
          : "#b1f7ab3f",

        border: compact
          ? "none"
          : isActive
          ? "2px solid #B6F500"
          : "1px solid rgba(46,125,50,0.45)",

        boxShadow: "none",

        transition: "background-color 0.2s ease, border 0.2s ease",

        /* =========================
           HOVER STATE (NO SHADOW)
           ========================= */
        "&:hover": {
          backgroundColor: compact ? "#f1ffd9" : "#f8ffef",

          border: compact
            ? "none"
            : "2px solid #B6F500",
        },
      }}
    >
      {/* ICON */}
      <Box
        sx={{
          color: isActive ? "#B6F500" : "#2e7d32",
          fontSize: compact
            ? { xs: 30, sm: 34 }
            : { xs: 48, sm: 56, md: 60 },

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          "& svg": {
            fontSize: "inherit",
          },
        }}
      >
        {icon}
      </Box>

      {/* NAME */}
      <Typography
        sx={{
          fontWeight: isActive ? 800 : 700,
          color: "#2f3e2f",
          fontSize: compact
            ? { xs: "0.7rem", sm: "0.75rem" }
            : { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
          textAlign: "center",
          letterSpacing: "0.03em",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}
