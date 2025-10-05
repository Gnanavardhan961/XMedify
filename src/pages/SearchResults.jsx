// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getMedicalCenters } from "../Api";
import HospitalCard from "../components/HospitalCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";
  const navigate = useNavigate();

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state || !city) return;
    setLoading(true);
    setError("");
    getMedicalCenters(state, city)
      .then(data => setHospitals(Array.isArray(data) ? data : []))
      .catch(err => setError("Failed to load medical centers (backend may be slow)"))
      .finally(() => setLoading(false));
  }, [state, city]);

  function handleBook(hospital) {
    // navigate to booking page with hospital in state
    navigate("/book", { state: { hospital, state, city } });
  }

  return (
    <div className="page search-results">
      <h1>{hospitals.length} medical centers available in {city}</h1>

      {loading && <p>Loading medical centers... (backend may take 50-60s)</p>}
      {error && <p className="error">{error}</p>}

      <div className="results-grid">
        {hospitals.map((h, i) => <HospitalCard key={i} hospital={h} onBook={handleBook} />)}
      </div>
    </div>
  );
}
