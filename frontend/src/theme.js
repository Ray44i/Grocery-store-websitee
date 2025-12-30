import { createTheme } from "@mui/material/styles";

const greenKetTheme = createTheme({
  palette: {
    /* =========================
       PRIMARY – Warm Leaf Green
       ========================= */
    primary: {
      main: "#5CB338",        // Fresh leaf green (main)
      light: "#78C841",       // Soft fresh green
      dark: "#2E7D32",        // Deep organic green
      contrastText: "#FFFFFF",
    },

    /* =========================
       SECONDARY – Warm Lime Accent (B4E50D)
       ========================= */
    secondary: {
      main: "#B4E50D",        // Warm lime (your request)
      light: "#DFF5A3",       // Very soft lime
      dark: "#8CBF00",        // Muted lime
      contrastText: "#2E3B0F",
    },

    /* =========================
       BACKGROUND – Soft & Fresh
       ========================= */
    background: {
      default: "#F4FBEF",     // Warm light green-white
      paper: "#FFFFFF",
    },

    /* =========================
       TEXT – Calm & Natural
       ========================= */
    text: {
      primary: "#263238",     // Soft charcoal
      secondary: "#4E6E58",   // Muted green-gray
    },
  },

  /* =========================
     TYPOGRAPHY
     ========================= */
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 700,
      color: "#2E7D32",
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.95rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  /* =========================
     COMPONENT STYLING
     ========================= */
  components: {
    /* ---------- HEADER ---------- */
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2E7D32", // deep leafy green
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },

    /* ---------- BUTTONS ---------- */
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingLeft: 18,
          paddingRight: 18,
        },
      },
    },

    /* ---------- PRODUCT CARDS ---------- */
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.07)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
          },
        },
      },
    },

    /* ---------- CONTAINER ---------- */
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: 24,
          paddingBottom: 24,
        },
      },
    },

    /* ---------- DRAWER / MENUS ---------- */
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#F1F8E9", // very soft green
        },
      },
    },
  },
});

export default greenKetTheme;
