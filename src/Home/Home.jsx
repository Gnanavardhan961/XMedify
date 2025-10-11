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
          <label>Select State:</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">--Choose a State--</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* City Dropdown */}
        <div id="city">
          <label>Select City:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">--Choose a City--</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" id="searchBtn">
          Search
        </button>
      </form>
    </div>
  );
}
