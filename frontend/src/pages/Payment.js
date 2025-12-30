import React, { useMemo, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Paper,
  Divider,
} from "@mui/material";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { confirmOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";

/* =========================
   FAKE PAYMENT PAGE
   ========================= */
export default function Payment() {
  const { items, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const cartItems = useMemo(
    () =>
      items.map((it) => ({
        productId: it.id,
        quantity: it.quantity || 1,
      })),
    [items]
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    if (!form.fullName || !form.phone || !form.address) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fakePaymentId = "FAKE_" + Date.now();

      await confirmOrder({
        paymentIntentId: fakePaymentId,
        phone: form.phone,
        address: form.address,
        items: cartItems,
      });

      clear();
      navigate("/orders"); // ✅ Direct redirect, no GIF
    } catch {
      setError("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Container sx={{ py: 6, maxWidth: 600 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Payment & Order Confirmation
      </Typography>

      {/* INFO ALERT */}
      <Alert
        severity="info"
        sx={{
          mb: 3,
          backgroundColor: "#cff7bd",
          color: "#16782d",
          "& .MuiAlert-icon": { color: "#058626" },
        }}
      >
        This is not real payment. No real money will be charged (until backend is implemented).
      </Alert>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        {/* PERSONAL INFO */}
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Delivery Address"
          name="address"
          margin="normal"
          onChange={handleChange}
        />

        <Divider sx={{ my: 3 }} />

        {/* CARD INFO */}
        <Typography variant="h6" gutterBottom>
          Card Information (Fake)
        </Typography>

        <TextField
          fullWidth
          label="Card Holder Name"
          name="cardName"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          margin="normal"
          onChange={handleChange}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <TextField
            fullWidth
            label="Expiry"
            placeholder="MM/YY"
            name="expiry"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="CVV"
            placeholder="123"
            name="cvv"
            onChange={handleChange}
          />
        </Box>

        {/* PAYMENT ICONS */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Accepted payment methods
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
            <img src="/images/payments/visa.png" alt="Visa" style={{ height: 28 }} />
            <img src="/images/payments/mastercard.png" alt="Mastercard" style={{ height: 28 }} />
            <img src="/images/payments/paypal.png" alt="PayPal" style={{ height: 28 }} />
          </Box>
        </Box>

        {/* CONFIRM BUTTON */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 4 }}
          disabled={loading}
          onClick={handlePay}
        >
          {loading ? "Processing..." : "Confirm Order"}
        </Button>
      </Paper>
    </Container>
  );
}
