// src/components/ProductCard.js

import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { resolveImageUrl } from "../config";

/* Fallback image if backend image fails */
const FALLBACK_IMAGE = "/images/oranig.jpg";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const navigate = useNavigate();

  const [showSnack, setShowSnack] = useState(false);
  const [pulse, setPulse] = useState(false);

  const handleAdd = () => {
    add(product);
    setPulse(true);
    setTimeout(() => setPulse(false), 300);
    setShowSnack(true);
  };

  const handleBuyNow = () => {
    add(product);
    navigate("/checkout");
  };

  const isOnSale = product.onSale && product.discountPrice;

  return (
    <>
      <Card
        sx={{
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          bgcolor: "#f8fbf4",
          transition: "all 0.25s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 10px 30px rgba(46,125,50,0.12)",
          },
        }}
      >
        {/* SALE BADGE */}
        {isOnSale && (
          <Chip
            label="SALE"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: "#d32f2f",
              color: "white",
              fontWeight: 700,
              zIndex: 2,
              height: 20,
              fontSize: "0.65rem",
            }}
          />
        )}

        {/* IMAGE (PROFESSIONAL FIX) */}
        <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
          <Box
            sx={{
              height: 160,
              width: "100%",
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
      <CardMedia
  component="img"
  image={resolveImageUrl(product.imageUrl || FALLBACK_IMAGE)}
  alt={product.name}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_IMAGE;
  }}
sx={{
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
  objectPosition: "center",
}}


/>

          </Box>
        </Link>

        {/* CONTENT */}
        <CardContent sx={{ textAlign: "center", p: 1.2 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.85rem",
              mb: 0.3,
              minHeight: 32,
            }}
          >
            {product.name}
          </Typography>

          {product.description && (
            <Typography
              color="text.secondary"
              sx={{
                fontSize: "0.7rem",
                mb: 0.6,
                minHeight: 26,
              }}
            >
              {product.description.slice(0, 45)}…
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              gap: 0.8,
              mb: 0.9,
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                color: "#2e7d32",
                fontSize: "0.9rem",
              }}
            >
              $
              {isOnSale
                ? product.discountPrice.toFixed(2)
                : product.price.toFixed(2)}
            </Typography>

            {isOnSale && (
              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                  fontSize: "0.65rem",
                }}
              >
                ${product.price.toFixed(2)}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 0.8, justifyContent: "center" }}>
            <Button
              variant="contained"
              size="small"
              startIcon={
                <ShoppingCartIcon
                  fontSize="small"
                  sx={{
                    transform: pulse ? "scale(1.3)" : "scale(1)",
                    transition: "transform 0.3s ease",
                  }}
                />
              }
              sx={{
                fontWeight: 700,
                fontSize: "0.65rem",
                py: 0.45,
                px: 1.2,
                borderRadius: 6,
                bgcolor: "#2e7d32",
                color: "white",
                "&:hover": {
                  bgcolor: "#1b5e20",
                },
              }}
              onClick={handleAdd}
            >
              Add
            </Button>

            <Button
              variant="outlined"
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: "0.65rem",
                py: 0.45,
                px: 1.2,
                borderRadius: 6,
                color: "#2e7d32",
                borderColor: "#2e7d32",
                "&:hover": {
                  bgcolor: "rgba(46,125,50,0.06)",
                  borderColor: "#1b5e20",
                },
              }}
              onClick={handleBuyNow}
            >
              Buy
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={showSnack}
        autoHideDuration={2000}
        onClose={() => setShowSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ fontWeight: 600 }}>
          Added to cart 🛒
        </Alert>
      </Snackbar>
    </>
  );
}
