// src/components/SearchSection.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchSection = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showStateList, setShowStateList] = useState(false);
  const [showCityList, setShowCityList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://meddata-backend.onrender.com/states')
      .then(res => res.json())
      .then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then(res => res.json())
        .then(setCities);
    }
  }, [selectedState]);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);
    setShowStateList(false);
    setShowCityList(false);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCityList(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate("/search", { state: { state: selectedState, city: selectedCity } });
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div id="state" className="dropdown-wrapper" style={{ position: 'relative', marginBottom: 20 }}>
        <label>State</label>
        <div
          className="dropdown"
          tabIndex={0}
          onClick={() => setShowStateList((prev) => !prev)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: 6,
            cursor: "pointer",
            background: "#f9f9f9"
          }}>
          {selectedState || "Select State"}
        </div>
        {/* VISIBLE LI LIST FOR CYPRESS */}
        {showStateList && (
          <ul style={{
            listStyle: "none",
            margin: 0,
            padding: "0",
            boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
            borderRadius: "6px",
            background: "#fff",
            position: "absolute",
            width: "100%",
            zIndex: 9,
            maxHeight: 160,
            overflowY: "auto"
          }}>
            {states.map(state => (
              <li
                key={state}
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={() => handleStateSelect(state)}
              >
                {state}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div id="city" className="dropdown-wrapper" style={{ position: 'relative', marginBottom: 20 }}>
        <label>City</label>
        <div
          className="dropdown"
          tabIndex={0}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: 6,
            cursor: (selectedState ? "pointer" : "not-allowed"),
            background: "#f9f9f9",
            color: selectedState ? "#222" : "#aaa"
          }}
          onClick={() => selectedState && setShowCityList((prev) => !prev)}
        >
          {selectedCity || "Select City"}
        </div>
        {/* VISIBLE LI LIST FOR CYPRESS */}
        {showCityList && (
          <ul style={{
            listStyle: "none",
            margin: 0,
            padding: "0",
            boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
            borderRadius: "6px",
            background: "#fff",
            position: "absolute",
            width: "100%",
            zIndex: 9,
            maxHeight: 160,
            overflowY: "auto"
          }}>
            {cities.map(city => (
              <li
                key={city}
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" id="searchBtn" className="search-btn">Search</button>
    </form>
  );
};

export default SearchSection;
