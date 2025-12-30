import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { resolveImageUrl } from "../config";

// Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";

// Icons
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const categoryMap = {
  Fruits: "fruits",
  Vegetables: "vegetables",
  Bakery: "bakery",
  Dairy: "dairy",
};

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
          setRating(data?.rating || 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || "Error loading product");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  // ⏳ Loading state
  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{ py: 6, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  //  Error state, better to use globale error handling 
  if (error || !product) {
    return (
      <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h4" color="error" gutterBottom>
          Product Not Found
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Back to Home
        </Button>
      </Container>
    );
  }

  //  SAFE category handling , this is  must be in the backend (THIS FIXES THE CRASH)
  const categoryKey = product.category
    ? categoryMap[product.category] || product.category.toLowerCase()
    : "products";

  const priceText =
    typeof product.price === "number"
      ? product.price.toFixed(2)
      : product.price;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* BACK BUTTON */}
      <Button
        startIcon={<ArrowBackIcon />}
        component={Link}
        to={`/category/${categoryKey}`}
        sx={{ mb: 3 }}
      >
        Back to {product.category || "Products"}
      </Button>

      <Grid container spacing={6}>
        {/* IMAGE , handled by the bvackend , mostly done i guess  */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={resolveImageUrl(product.imageUrl)}
              alt={product.name}
              onError={(e) => {
                e.target.src = "/images/products/placeholder.jpg";
              }}
              sx={{
                width: "100%",
                height: 450,
                objectFit: "cover",
              }}
            />
          </Paper>
        </Grid>

        {/* DETAILS , should be in the backend , or it can be fixed in the frontend  */}
        <Grid item xs={12} md={6}>
          {/* TITLE */}
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            {product.name}
          </Typography>

          {/* RATING , not fixed rating , it should be handling by the user how rates it */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating
              name={`product-rating-${product.id}`}
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
            <Typography sx={{ ml: 1, fontSize: "0.9rem", color: "text.secondary" }}>
              {rating.toFixed(1)} / 5
            </Typography>
          </Box>

          {/* CATEGORY + STOCK  , this need to be linked to the backend */}
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Chip label={product.category || "General"} color="primary" />
            <Chip label="In Stock" color="success" />
          </Box>

          {/* PRICE  , need to be based on the database */}
          <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
            ${priceText}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* DESCRIPTION */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Product Description
          </Typography>
          <Typography sx={{ mb: 3, color: "text.secondary" }}>
            {product.description ||
              "This product is carefully selected to ensure premium quality, freshness, and great taste."}
          </Typography>

          {/* HIGHLIGHTS */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Why you’ll love it:
            </Typography>
            <ul style={{ marginTop: 8, paddingLeft: 20 }}>
              <li>Fresh and organic</li>
              <li>Carefully sourced</li>
              <li>High quality guaranteed</li>
            </ul>
          </Box>

          {/* ACTIONS */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              type="number"
              label="Quantity"
              size="small"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value)))
              }
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />

            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => add(product, quantity)}
            >
              Add to Basket
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                add(product, quantity);
                navigate("/checkout");
              }}
            >
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
