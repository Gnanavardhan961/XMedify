import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STATES_API = "https://meddata-backend.onrender.com/states";
const CITIES_API = "https://meddata-backend.onrender.com/cities/"; // append state

export default function LandingPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch states
  useEffect(() => {
    setLoadingStates(true);
    fetch(STATES_API)
      .then((res) => res.json())
      .then((data) => {
        setStates(data || []);
        setLoadingStates(false);
      })
      .catch(() => {
        setError("Failed to load states");
        setLoadingStates(false);
      });
  }, []);

  // Fetch cities for selected state
  useEffect(() => {
    if (!stateName) {
      setCities([]);
      setCityName("");
      return;
    }
    setLoadingCities(true);
    fetch(`${CITIES_API}${encodeURIComponent(stateName)}`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data || []);
        setLoadingCities(false);
      })
      .catch(() => {
        setError("Failed to load cities");
        setLoadingCities(false);
      });
  }, [stateName]);

  // Handle search
  function handleSearch(e) {
    e.preventDefault();
    if (!stateName || !cityName) return alert("Choose state and city");
    navigate(
      `/search?state=${encodeURIComponent(stateName)}&city=${encodeURIComponent(cityName)}`
    );
  }

  return (
    <div className="landing container">
      <section className="hero">
        <h1>Find medical centers & book appointments</h1>
        <p>Search centers across the USA</p>
      </section>

      <section className="search-section card">
        <h2>Find Centers</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSearch}>
          <div id="state" className="field">
            <label>State</label>
            <select
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
            >
              <option value="">-- Select state --</option>
              {loadingStates && <option>Loading...</option>}
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div id="city" className="field">
            <label>City</label>
            <select
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              disabled={!stateName}
            >
              <option value="">-- Select city --</option>
              {loadingCities && <option>Loading...</option>}
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <button type="submit" id="searchBtn" className="btn">
              Search
            </button>
          </div>
        </form>
      </section>

      <section id="hospitals" className="card">
        <h2>Why choose us</h2>
        <p>
          We provide accurate listings of medical centers with easy appointment
          booking and real-time availability.
        </p>
      </section>
    </div>
  );
}
