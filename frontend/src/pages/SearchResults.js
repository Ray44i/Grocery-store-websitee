import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Grid, Typography, Container } from "@mui/material";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);

 useEffect(() => {
  getAllProducts().then((res) => {
    const productsArray = Array.isArray(res) ? res : res.data;

    const filtered = productsArray.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setProducts(filtered);
  });
}, [query]);


  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Search results for "{query}"
      </Typography>

      {products.length === 0 ? (
        <Typography>No products found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
