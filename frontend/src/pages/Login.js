import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, register, resetPassword } = useAuth(); // ✅ IMPORTANT
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      await register(email, password);
      alert("Registration successful. You can now log in.");
    } catch {
      setError("Account already exists.");
    } finally {
      setLoading(false);
    }
  };

 const handleForgotPassword = async () => {
  setError("");

  if (!email) {
    setError("Please enter your email first.");
    return;
  }

  try {
    await resetPassword(email);
    alert("Password reset email sent. Check inbox or spam.");
  } catch (err) {
    console.error("🔥 PASSWORD RESET ERROR 🔥");
    console.error("CODE:", err.code);
    console.error("MESSAGE:", err.message);

    // TEMP: show exact Firebase error
    setError(`${err.code} — ${err.message}`);
  }
};


  return (
    <Container sx={{ py: 4, maxWidth: 520 }}>
      <Typography variant="h4" gutterBottom>
        Login / Sign Up
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Button
          variant="text"
          color="success"
          onClick={handleForgotPassword}
          sx={{ alignSelf: "flex-end" }}
        >
          Forgot password?
        </Button>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleLogin}
            disabled={loading}
            fullWidth
          >
            Login
          </Button>

          <Button
            variant="outlined"
            onClick={handleRegister}
            disabled={loading}
            fullWidth
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
