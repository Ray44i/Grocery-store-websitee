import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { resolveImageUrl } from "../config";

export default function Checkout() {
  const { items, add, decrement, remove, clear } = useCart();

  // ✅ ALWAYS SCROLL TO TOP WHEN PAGE LOADS
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalPrice = items.reduce(
    (sum, it) => sum + it.price * (it.quantity || 1),
    0
  );

  /* =========================
     EMPTY CART
     ========================= */
  if (items.length === 0) {
    return (
      <Container
        maxWidth="md"
        sx={{
          py: 6,
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <ShoppingBasketIcon color="primary" sx={{ fontSize: 80, mb: 2 }} />

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Your basket is empty
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Add fresh GreenKet products to start shopping.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/"
        >
          Start Shopping
        </Button>
      </Container>
    );
  }

  /* =========================
     CART PAGE
     ========================= */
  return (
    <Container maxWidth="lg" sx={{ py: 5, minHeight: "70vh" }}>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
        Your Shopping Basket
      </Typography>

      <Grid container spacing={4}>
        {/* =========================
            LEFT: CART ITEMS
            ========================= */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">
              Items ({items.length})
            </Typography>

            <Button
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={clear}
            >
              Clear All
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {items.map((item) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                mb: 3,
                p: 2,
                borderRadius: 3,
                bgcolor: "background.default",
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                {/* Image */}
                <Grid item xs={12} sm={2}>
                  <CardMedia
                    component="img"
                    image={resolveImageUrl(item.imageUrl)}
                    alt={item.name}
                    sx={{
                      height: 90,
                      width: 90,
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />
                </Grid>

                {/* Info */}
                <Grid item xs={12} sm={4}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {item.name}
                  </Typography>
                  <Typography color="text.secondary">
                    ${item.price.toFixed(2)} / unit
                  </Typography>
                </Grid>

                {/* Quantity */}
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <IconButton
                    onClick={() => decrement(item.id)}
                    color="primary"
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      bgcolor: "background.paper",
                      minWidth: 32,
                      textAlign: "center",
                    }}
                  >
                    {item.quantity || 1}
                  </Typography>

                  <IconButton
                    onClick={() => add(item)}
                    color="primary"
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>

                {/* Subtotal */}
                <Grid item xs={8} sm={2}>
                  <Typography variant="h6" color="primary">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </Typography>
                </Grid>

                {/* Remove */}
                <Grid item xs={4} sm={1}>
                  <IconButton onClick={() => remove(item.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Button
            component={Link}
            to="/"
            variant="outlined"
            sx={{ mt: 3 }}
          >
            Continue Shopping
          </Button>
        </Grid>

        {/* =========================
            RIGHT: ORDER SUMMARY
            ========================= */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              position: "sticky",
              top: 100,
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
              Order Summary
            </Typography>

            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: "2px dashed",
                borderColor: "primary.light",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Total
              </Typography>
              <Typography variant="h6" color="primary" fontWeight={700}>
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 3 }}
              component={Link}
              to="/payment"
            >
              Proceed to Payment
            </Button>
            {/* DELIVERY & PAYMENT GIFS */}
<Box
  sx={{
    mt: 3,
    display: "flex",
    justifyContent: "center",
    gap: 2,
    opacity: 0.9,
  }}
>
  <Box sx={{ textAlign: "center" }}>
    <img
      src="/images/add/delivery.gif"
      alt="Fast Delivery"
      style={{ height: 48 }}
    />
    <Typography variant="caption" display="block">
      Fast Delivery
    </Typography>
  </Box>

  <Box sx={{ textAlign: "center" }}>
    <img
      src="/images/add/payment.gif"
      alt="Secure Payment"
      style={{ height: 48 }}
    />
    <Typography variant="caption" display="block">
      Secure Payment
    </Typography>
  </Box>
</Box>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
