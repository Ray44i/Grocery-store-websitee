import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Grid } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// Dummy orders (later from backend)
const dummyOrders = [
  {
    id: "ORD-001",
    date: "2025-12-16",
    items: [
      { name: "Organic Apple", quantity: 3, price: 2.5 },
      { name: "Whole Wheat Bread", quantity: 1, price: 3.0 },
    ],
    total: 10.5,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2025-12-15",
    items: [
      { name: "Fresh Milk", quantity: 2, price: 4.0 },
      { name: "Banana", quantity: 6, price: 1.5 },
    ],
    total: 11.0,
    status: "Pending",
  },
];

export default function Orders() {
  const { user } = useAuth();          // ✅ Hook first
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      setOrders(dummyOrders);
    }
  }, [user]);

  // 🔐 Redirect AFTER hooks
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800 }}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        orders.map((order) => (
          <Paper key={order.id} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Order ID: {order.id}
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Date: {order.date} | Status: {order.status}
            </Typography>

            {order.items.map((item, idx) => (
              <Grid container key={idx} spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={6}>{item.name}</Grid>
                <Grid item xs={3}>Qty: {item.quantity}</Grid>
                <Grid item xs={3}>${item.price.toFixed(2)}</Grid>
              </Grid>
            ))}

            <Typography sx={{ mt: 2, fontWeight: 700 }}>
              Total: ${order.total.toFixed(2)}
            </Typography>
          </Paper>
        ))
      )}
    </Container>
  );
}
