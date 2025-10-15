// src/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch all states
  useEffect(() => {
    fetch("https://meddata-backend.onrender.com/states")
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch(console.error);
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedState) {
      fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch(console.error);
    } else {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedState]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedState || !selectedCity) {
      alert("Please select both state and city");
      return;
    }
    navigate(`/search?state=${selectedState}&city=${selectedCity}`);
  };

  return (
    <div className="home-page">
      <h1>Find Medical Centers</h1>
      <form onSubmit={handleSearch}>
        {/* State Dropdown */}
        <div id="state">
          <label>Select State:</label>
          <ul>
            {states.map((stateItem, idx) => (
              <li
                key={idx}
                onClick={() => setSelectedState(stateItem)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedState === stateItem ? "bold" : "normal",
                }}
              >
                {stateItem}
              </li>
            ))}
          </ul>
        </div>

        {/* City Dropdown */}
        <div id="city">
          <label>Select City:</label>
          <ul>
            {cities.map((cityItem, idx) => (
              <li
                key={idx}
                onClick={() => setSelectedCity(cityItem)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedCity === cityItem ? "bold" : "normal",
                }}
              >
                {cityItem}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" id="searchBtn">
          Search
        </button>
      </form>
    </div>
  );
}
