// src/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
          <ul>
            {states.map((state) => (
              <li
                key={state}
                onClick={() => setSelectedState(state)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedState === state ? "bold" : "normal",
                }}
              >
                {state}
              </li>
            ))}
          </ul>
        </div>

        {/* City Dropdown */}
        <div id="city">
          <ul>
            {cities.map((city) => (
              <li
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  cursor: selectedState ? "pointer" : "not-allowed",
                  fontWeight: selectedCity === city ? "bold" : "normal",
                }}
              >
                {city}
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
