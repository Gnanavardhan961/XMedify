// Landing.js
import React from "react";
import StateCityForm from "../components/StateCityForm";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  function handleSearch({state, city}) {
    // push to search results page with query params
    navigate(`/search?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`);
  }

  return (
    <div className="page landing">
      <h1>Find medical centers near you</h1>
      <StateCityForm onSearch={handleSearch} />
      {/* Example carousel area (Swiper) can go here per Figma */}
    </div>
  );
}
