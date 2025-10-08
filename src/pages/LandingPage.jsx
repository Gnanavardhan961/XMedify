import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HospitalCard from "../components/HospitalCard";
import BookingPage from "./BookingPage"; // Correct import

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
  const [selectedCenter, setSelectedCenter] = useState(null);
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

  // Fetch cities
  useEffect(() => {
    if (!stateName) return setCities([]);
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

  // Fetch hospitals
  useEffect(() => {
    if (!stateName || !cityName) return setHospitals([]);
    setLoadingHospitals(true);
    fetch(`${HOSPITALS_API}${encodeURIComponent(stateName)}/${encodeURIComponent(cityName)}`)
      .then((res) => res.json())
      .then((data) => {
        setHospitals(data || []);
        setLoadingHospitals(false);
      })
      .catch(() => {
        setError("Failed to load hospitals");
        setLoadingHospitals(false);
      });
  }, [stateName, cityName]);

  function handleBooking(center) {
    setSelectedCenter(center);
  }

  return (
    <div className="landing container">
      <section id="search-section" className="search-section card">
        <h2>Find Centers</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div id="state" className="field">
          <label>State</label>
          <select value={stateName} onChange={(e) => setStateName(e.target.value)}>
            <option value="">-- Select state --</option>
            {loadingStates && <option>Loading...</option>}
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
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
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </section>

      <section id="hospitals" className="card">
        <h2>Hospitals</h2>
        {loadingHospitals && <p>Loading hospitals...</p>}
        {hospitals.map((center) => (
          <HospitalCard
            key={center.id || center.name}
            center={center}
            onBook={() => handleBooking(center)}
          />
        ))}
      </section>

      {selectedCenter && (
        <BookingPage
          center={selectedCenter}
          onClose={() => setSelectedCenter(null)}
        />
      )}
    </div>
  );
}
