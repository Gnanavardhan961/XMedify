// src/pages/LandingPage.jsx
import React from "react";
import SearchSection from "../components/SearchSection";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const handleSearch = (state, city) => {
    navigate("/search", { state: { state, city } });
  };

  return (
    <div>
      <nav>
        <a href="#">Find Doctors</a>
        <a href="#">Hospitals</a>
        <a href="#">Medicines</a>
      </nav>
      <SearchSection onSearch={handleSearch} />
      {/* Swiper carousel here */}
    </div>
  );
}
