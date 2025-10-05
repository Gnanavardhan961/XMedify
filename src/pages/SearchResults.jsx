// SearchResults.js
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getMedicalCenters } from "../api";
import HospitalCard from "../components/HospitalCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!state || !city) return;
    setLoading(true);
    setError(null);
    getMedicalCenters(state, city)
      .then(data => {
        // backend returns array of hospital objects (map or pass-through)
        setHospitals(data || []);
      })
      .catch(err => setError("Failed to fetch medical centers. Server may be slow."))
      .finally(() => setLoading(false));
  }, [state, city]);

  function handleBook(hospital) {
    // navigate to booking page and pass hospital via state
    navigate("/my-bookings", { state: { action: "book", hospital, city, state } });
  }

  return (
    <div className="page search-results">
      <h1>{hospitals.length} medical centers available in {city}</h1>

      {loading && <p>Loading medical centers... (backend may be slow)</p>}
      {error && <p className="error">{error}</p>}

      <div className="results-grid">
        {hospitals.map((h, idx) => (
          <HospitalCard key={idx} hospital={h} onBook={handleBook} />
        ))}
      </div>
    </div>
  );
}
