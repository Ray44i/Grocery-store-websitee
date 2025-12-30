import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase, IconButton } from "@mui/material";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // 🔍 THIS is what you asked about
  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <InputBase
        placeholder="Search fresh groceries..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        sx={{ color: "white", ml: 2 }}
      />

      <IconButton onClick={handleSearch}>
        <SearchIcon sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
}
