import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";

// Components & API
import ProductCard from "../components/ProductCard";
import CategoriesBar from "../components/CategoriesBar"; // ✅ NEW
import api from "../api/axios";

export default function CategoryProducts() {
  const { category } = useParams();
  const categoryKey = category?.toLowerCase();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryKey) return;

    let mounted = true;
    setLoading(true);

    api
      .get(`/products/category/${categoryKey}`)
      .then((res) => {
        if (!mounted) return;
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to load category products", err);
        setProducts([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [categoryKey]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* ================= CATEGORIES (STICKY) ================= */}
      <CategoriesBar sticky />

      {/* ================= PRODUCTS GRID ================= */}
      {loading ? (
        <Grid container spacing={2} justifyContent="center">
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid item xs={6} sm={4} md={3} lg={2.5} key={i}>
              <Skeleton
                variant="rectangular"
                height={220}
                sx={{ borderRadius: 3 }}
              />
              <Skeleton width="70%" sx={{ mt: 1 }} />
              <Skeleton width="40%" />
            </Grid>
          ))}
        </Grid>
      ) : products.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <Typography color="text.secondary">
            No products found in this category.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={3} lg={2.5} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
