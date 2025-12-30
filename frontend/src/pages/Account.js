import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import {
  Person,
  ShoppingBag,
  LocationOn,
  Lock,
  Logout,
} from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// 🔥 Firebase
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

/* =========================
   LEFT MENU
   ========================= */
const AccountMenu = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Personal Information", key: "info", icon: <Person />, type: "tab" },
    { label: "Manage Address", key: "address", icon: <LocationOn />, type: "tab" },
    { label: "Password Manager", key: "password", icon: <Lock />, type: "tab" },
    { label: "My Orders", icon: <ShoppingBag />, type: "route", path: "/orders" },
    { label: "Logout", key: "logout", icon: <Logout />, type: "action" },
  ];

  return (
    <Paper elevation={4} sx={{ borderRadius: 4, p: 1 }}>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            selected={item.type === "tab" && activeTab === item.key}
            onClick={() => {
              if (item.type === "tab") onTabChange(item.key);
              if (item.type === "route") navigate(item.path);
              if (item.type === "action") onTabChange("logout");
            }}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: "#e8f5e9",
                color: "#1f4d2b",
                fontWeight: 700,
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

/* =========================
   PERSONAL INFO
   ========================= */
const PersonalInfo = ({ user }) => (
  <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
    <Typography variant="h5" fontWeight={800} mb={1}>
      Personal Information
    </Typography>
    <Typography color="text.secondary" mb={3}>
      Manage your account details
    </Typography>

    <Divider sx={{ mb: 3 }} />

    <Typography mb={1}>
      <strong>Email:</strong> {user.email}
    </Typography>

    <Typography>
      <strong>Status:</strong>{" "}
      <Box component="span" sx={{ color: "success.main", fontWeight: 600 }}>
        Active
      </Box>
    </Typography>
  </Paper>
);

/* =========================
   MANAGE ADDRESS
   ========================= */
const ManageAddress = ({ user }) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    street: "",
    details: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadAddress = async () => {
      const ref = doc(db, "addresses", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setForm(snap.data());
    };
    loadAddress();
  }, [user.uid]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveAddress = async () => {
    setSaving(true);
    await setDoc(doc(db, "addresses", user.uid), form);
    setSaving(false);
    alert("Address saved successfully");
  };

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Manage Address
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} fullWidth />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="City" name="city" value={form.city} onChange={handleChange} fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Street" name="street" value={form.street} onChange={handleChange} fullWidth />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Additional Details" name="details" value={form.details} onChange={handleChange} fullWidth multiline rows={3} />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="success" onClick={saveAddress} disabled={saving}>
            {saving ? "Saving..." : "Save Address"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

/* =========================
   MAIN PAGE
   ========================= */
export default function Account() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  if (loading) {
    return (
      <Box sx={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const handleTabChange = (key) => {
    if (key === "logout") {
      logout();
      navigate("/");
    } else {
      setActiveTab(key);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return <PersonalInfo user={user} />;
      case "address":
        return <ManageAddress user={user} />;
      case "password":
        return (
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight={700}>
              Password Manager
            </Typography>
            <Typography color="text.secondary" mt={1}>
              Password management coming soon.
            </Typography>
          </Paper>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5faf2", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 4, display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: "#2e7d32", fontSize: 28 }}>
            {user.email?.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="h4" fontWeight={900}>
              My Account
            </Typography>
            <Typography color="text.secondary">
              Welcome back 👋
            </Typography>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <AccountMenu activeTab={activeTab} onTabChange={handleTabChange} />
          </Grid>
          <Grid item xs={12} md={9}>
            {renderContent()}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
