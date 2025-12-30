import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background:
          "linear-gradient(180deg, #1b5e20 0%, #2e7d32 100%)",
        color: "#f7faef",
        pt: 7,
        pb: 4,
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* BRAND + NEWSLETTER */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 1, letterSpacing: "0.05em" }}
            >
              GreenKet
            </Typography>

            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
              Your trusted online grocery store delivering fresh, organic
              products straight to your doorstep.
            </Typography>

            {/* Newsletter */}
            <Box sx={{ display: "flex", gap: 1.2, mb: 3 }}>
              <TextField
                size="small"
                placeholder="Your email address"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  bgcolor: "#f7faef",
                  borderRadius: 1.5,
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#B6F500",
                  color: "#1b5e20",
                  fontWeight: 700,
                  px: 2.5,
                  "&:hover": { bgcolor: "#a6e600" },
                }}
              >
                Subscribe
              </Button>
            </Box>

            {/* Social Icons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {[FacebookIcon, TwitterIcon, InstagramIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    color: "#f7faef",
                    bgcolor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      bgcolor: "#B6F500",
                      color: "#1b5e20",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* QUICK LINKS */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              {["Home", "Shop", "My Account", "Orders"].map((text) => (
                <MuiLink
                  key={text}
                  href="#"
                  underline="none"
                  sx={{
                    color: "#f7faef",
                    opacity: 0.9,
                    "&:hover": {
                      color: "#B6F500",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {text}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* CUSTOMER SUPPORT */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
              Customer Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              {["FAQ", "Return Policy", "Privacy Policy", "Terms & Conditions"].map(
                (text) => (
                  <MuiLink
                    key={text}
                    href="#"
                    underline="none"
                    sx={{
                      color: "#f7faef",
                      opacity: 0.9,
                      "&:hover": {
                        color: "#B6F500",
                        transform: "translateX(4px)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {text}
                  </MuiLink>
                )
              )}
            </Box>
          </Grid>

          {/* LOCATION + MAP */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
              Our Location
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              123 Green Street, Harvest City
            </Typography>

            <Box
              sx={{
                width: "100%",
                height: 160,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <iframe
                title="GreenKet Location"
                src="https://www.google.com/maps?q=Istanbul&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Grid>
        </Grid>

        {/* COPYRIGHT */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            mt: 5,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            © {new Date().getFullYear()} GreenKet. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
