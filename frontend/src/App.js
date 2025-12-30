import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Login from "./pages/Login";
import CategoryProducts from "./pages/CategoryProducts";
import Payment from "./pages/Payment";
import SearchResults from "./pages/SearchResults"; // ✅ ADDED

import { CartProvider } from "./context/CartContext";
import greenKetTheme from "./theme";

import "./App.css";

function App() {
  return (
    <ThemeProvider theme={greenKetTheme}>
      <CssBaseline />

      <CartProvider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* 🔝 Header (contains Navbar + Search) */}
          <Header />

          {/* ================= MAIN CONTENT ================= */}
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Routes>
                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* 🔍 SEARCH RESULTS (ACTIVATED) */}
                <Route path="/search" element={<SearchResults />} />

                {/* Category */}
                <Route
                  path="/category/:category"
                  element={<CategoryProducts />}
                />

                {/* Cart & Checkout */}
                <Route path="/cart" element={<Checkout />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* Payment (mock / demo) */}
                <Route path="/payment" element={<Payment />} />

                {/* Product Details */}
                <Route path="/products/:id" element={<ProductDetail />} />

                {/* Orders & Account */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/account" element={<Account />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />

                {/* Settings (placeholder) */}
                <Route
                  path="/settings"
                  element={
                    <Box sx={{ py: 4 }}>
                      <Typography variant="h5" gutterBottom>
                        Settings
                      </Typography>
                      <Typography color="text.secondary">
                        User settings and preferences will appear here.
                      </Typography>
                    </Box>
                  }
                />
              </Routes>
            </Container>
          </Box>

          {/* 🔻 Footer */}
          <Footer />
        </Box>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
