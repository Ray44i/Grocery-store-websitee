import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Material UI
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Button,
  Box,
  InputBase,
  Typography,
  Tooltip,
} from "@mui/material";

// Icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

// Contexts
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

/* ================= LOGO ================= */
const GreenKetLogo = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Box
      component="img"
      src="/images/mygreenlogo.png"
      alt="GreenKet Logo"
      sx={{
        width: { xs: 64, sm: 76, md: 86 },
        height: { xs: 64, sm: 76, md: 86 },
        objectFit: "contain",
      }}
    />
    <Typography
      sx={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        letterSpacing: "0.04em",
        fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.7rem" },
        color: "#f7faef",
      }}
    >
      GreenKet
    </Typography>
  </Box>
);

/* ================= HEADER ================= */
export default function Header() {
  const { items } = useCart();
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  /* 🔍 SEARCH STATE */
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const totalItems = items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const [pulse, setPulse] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 300);
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundImage: "url('/images/header-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: scrolled ? "0 4px 14px rgba(0,0,0,0.28)" : "none",
      }}
    >
      <Toolbar
        sx={{
          gap: 2,
          bgcolor: "rgba(0,0,0,0.55)",
          justifyContent: "space-between",
          flexWrap: "wrap",
          py: { xs: 0.7, md: 1 },
        }}
      >
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Home">
            <IconButton component={Link} to="/" color="inherit">
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Box component={Link} to="/" sx={{ textDecoration: "none" }}>
            <GreenKetLogo />
          </Box>
        </Box>

        {/* 🔍 SEARCH (NOW ACTIVE) */}
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: 440,
            ml: 3,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            bgcolor: "#b8f50045",
            borderRadius: 3,
            px: 2,
          }}
        >
          <InputBase
            placeholder="Search fresh groceries…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            sx={{ flex: 1, color: "white" }}
          />
          <IconButton color="inherit" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!loading &&
            (user ? (
              <>
                <Button
                  component={Link}
                  to="/account"
                  color="inherit"
                  startIcon={<AccountCircleIcon />}
                  sx={{
                    fontWeight: isActive("/account") ? 700 : 500,
                  }}
                >
                  Account
                </Button>

                <Button color="inherit" onClick={logout} sx={{ opacity: 0.85 }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  sx={{
                    opacity: isActive("/login") ? 1 : 0.8,
                    fontWeight: isActive("/login") ? 700 : 500,
                  }}
                >
                  Login
                </Button>

                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    bgcolor: "#B6F500",
                    color: "#000",
                    fontWeight: 700,
                    borderRadius: 6,
                    "&:hover": { bgcolor: "#a6e600" },
                  }}
                >
                  Sign Up
                </Button>
              </>
            ))}

          {/* CART */}
          <IconButton
            component={Link}
            to="/checkout"
            color="inherit"
            sx={{
              animation: pulse ? "pulse 0.3s ease" : "none",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.15)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
