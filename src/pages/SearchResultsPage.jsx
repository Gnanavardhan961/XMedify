import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HospitalCard from "../components/HospitalCard";

const DATA_API = "https://meddata-backend.onrender.com/data";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResultsPage() {
  const q = useQuery();
  const stateName = q.get("state") || "";
  const cityName = q.get("city") || "";
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!stateName || !cityName) return;
    setLoading(true);
    // fetch with query params
    fetch(`${DATA_API}?state=${encodeURIComponent(stateName)}&city=${encodeURIComponent(cityName)}`)
      .then((res) => res.json())
      .then((data) => {
        // data expected to be an array — map/extract fields
        setCenters(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch centers");
        setLoading(false);
      });
  }, [stateName, cityName]);

  function handleBook(center) {
    navigate("/booking", { state: { center, city: cityName, state: stateName } });
  }

  return (
    <div className="container search-results">
      <h1>{centers.length} medical centers available in {cityName}</h1>

      {loading && <p>Loading centers (this may take a while)...</p>}
      {error && <p className="error">{error}</p>}

      <div className="list">
        {centers.map((c, idx) => (
          <HospitalCard key={idx} center={c} onBook={() => handleBook(c)} />
        ))}
      </div>
    </div>
  );
}
