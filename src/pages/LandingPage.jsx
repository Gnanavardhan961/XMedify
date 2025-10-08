import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STATES_API = "https://meddata-backend.onrender.com/states";
const CITIES_API = "https://meddata-backend.onrender.com/cities/";

export default function LandingPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(STATES_API)
      .then(res => res.json())
      .then(data => setStates(data || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!stateName) return setCities([]);
    fetch(`${CITIES_API}${encodeURIComponent(stateName)}`)
      .then(res => res.json())
      .then(data => setCities(data || []))
      .catch(console.error);
  }, [stateName]);

  const handleSearch = e => {
    e.preventDefault();
    if (stateName && cityName) {
      navigate(`/search?state=${stateName}&city=${cityName}`);
    }
  };

  return (
    <section className="search-section card">
      <h2>Find Centers</h2>
      <div id="state">
        <label>State</label>
        <select value={stateName} onChange={e => setStateName(e.target.value)}>
          <option value="">-- Select state --</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div id="city">
        <label>City</label>
        <select value={cityName} onChange={e => setCityName(e.target.value)} disabled={!stateName}>
          <option value="">-- Select city --</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <button type="submit" id="searchBtn" onClick={handleSearch}>Search</button>
    </section>
  );
}
