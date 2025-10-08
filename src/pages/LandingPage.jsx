import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HospitalCard from "../components/HospitalCard";

const STATES_API = "https://meddata-backend.onrender.com/states";
const CITIES_API = "https://meddata-backend.onrender.com/cities/";
const HOSPITALS_API = "https://meddata-backend.onrender.com/hospitals/";

export default function LandingPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch states
  useEffect(() => {
    setLoadingStates(true);
    fetch(STATES_API)
      .then((res) => res.json())
      .then((data) => setStates(data || []))
      .catch(() => setError("Failed to load states"))
      .finally(() => setLoadingStates(false));
  }, []);

  // Fetch cities
  useEffect(() => {
    if (!stateName) return setCities([]);
    setLoadingCities(true);
    fetch(`${CITIES_API}${encodeURIComponent(stateName)}`)
      .then((res) => res.json())
      .then((data) => setCities(data || []))
      .catch(() => setError("Failed to load cities"))
      .finally(() => setLoadingCities(false));
  }, [stateName]);

  // Fetch hospitals
  useEffect(() => {
    if (!stateName || !cityName) return setHospitals([]);
    setLoadingHospitals(true);
    fetch(`${HOSPITALS_API}${encodeURIComponent(stateName)}/${encodeURIComponent(cityName)}`)
      .then((res) => res.json())
      .then((data) => setHospitals(data || []))
      .catch(() => setError("Failed to load hospitals"))
      .finally(() => setLoadingHospitals(false));
  }, [stateName, cityName]);

  function handleBooking(center) {
    navigate("/booking", { state: { center } });
  }

  return (
    <div className="landing container">
      <section className="search-section card">
        <h2>Find Centers</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div id="state" className="field">
          <label>State</label>
          <select value={stateName} onChange={(e) => setStateName(e.target.value)}>
            <option value="">-- Select state --</option>
            {loadingStates && <option>Loading...</option>}
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
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
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </section>

      <section id="hospitals" className="card">
        <h2>Hospitals</h2>
        {loadingHospitals && <p>Loading hospitals...</p>}
        <ul>
          {hospitals.map((center) => (
            <li key={center.id || center.name}>
              <HospitalCard center={center} onBook={() => handleBooking(center)} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
