import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Skeleton,
} from "@mui/material";

// Components
import ProductCard from "../components/ProductCard";
import CategoriesBar from "../components/CategoriesBar"; // ✅ NEW
import HomeGifStrip from "../components/HomeGifStrip";

// Services
import { getAllProducts } from "../services/productService";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getAllProducts()
      .then((data) => {
        if (mounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const featuredProducts = products.some((p) => p.featured)
    ? products.filter((p) => p.featured)
    : products.slice(0, 8);

  const saleProducts = products.filter(
    (p) => p.onSale && p.discountPrice != null
  );

  const loadingSkeletons = Array.from(new Array(8)).map((_, i) => (
    <Grid item key={i} xs={6} sm={4} md={3} lg={2.5}>
      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
      <Skeleton width="70%" />
      <Skeleton width="40%" />
    </Grid>
  ));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* ================= HERO ================= */}
      <Box
        sx={{
          mb: 7,
          p: { xs: 4, md: 7 },
          borderRadius: 5,
          textAlign: "center",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/green_hero_pic.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <Typography variant="h3" fontWeight={800} color="#B6F500">
          GreenKet.
        </Typography>

        <Typography variant="h6" sx={{ color: "#fff", my: 3 }}>
          Everything <b style={{ color: "#B6F500" }}>fresh & organic</b>{" "}
          delivered to your door.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            px: 5,
            borderRadius: 8,
            backgroundColor: "#B6F500",
            color: "#000",
          }}
          href="#weekly-picks"
        >
          Shop Now
        </Button>
      </Box>

      {/* ================= CATEGORIES (REUSABLE) ================= */}
      <CategoriesBar />

      {/* ================= GIF STRIP ================= */}
      <HomeGifStrip />

      {/* ================= WEEKLY PICKS ================= */}
      <Box id="weekly-picks" sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Weekly Fresh Picks
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Picked carefully just for you.
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {loading
            ? loadingSkeletons
            : featuredProducts.map((p) => (
                <Grid item key={p.id} xs={6} sm={4} md={3} lg={2.5}>
                  <ProductCard product={p} />
                </Grid>
              ))}
        </Grid>
      </Box>

      {/* ================= ON SALE ================= */}
      {!loading && saleProducts.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" fontWeight={700} mb={2}>
            ON SALE PRODUCTS
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {saleProducts.map((p) => (
              <Grid item key={p.id} xs={6} sm={4} md={3} lg={2.5}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
