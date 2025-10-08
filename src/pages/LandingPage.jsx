import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STATES_API = "https://meddata-backend.onrender.com/states";
const CITIES_API = "https://meddata-backend.onrender.com/cities/";

export default function LandingPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(STATES_API)
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(CITIES_API + selectedState)
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedState]);

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${selectedState}&city=${selectedCity}`);
    }
  }

  return (
    <div className="landing-page">
      <h1>Find Medical Centers</h1>
      <form onSubmit={handleSubmit}>
        {/* State dropdown (must have id="state" and li items) */}
        <div id="state">
          <ul>
            {states.map((s) => (
              <li key={s}
                onClick={() => setSelectedState(s)}
                style={{
                  background: s === selectedState ? "#007BFF" : "#fff",
                  color: s === selectedState ? "#fff" : "#000",
                  cursor: "pointer",
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* City dropdown (must have id="city" and li items) */}
        <div id="city">
          <ul>
            {cities.map((c) => (
              <li key={c}
                onClick={() => setSelectedCity(c)}
                style={{
                  background: c === selectedCity ? "#007BFF" : "#fff",
                  color: c === selectedCity ? "#fff" : "#000",
                  cursor: "pointer",
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" id="searchBtn">Search</button>
      </form>
    </div>
  );
}
