// src/Search/Search.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookingModal from "../components/BookingModal/BookingModal";

export default function Search() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get("state");
  const city = queryParams.get("city");

  useEffect(() => {
    if (!state || !city) return;
    fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
      .then((res) => res.json())
      .then(setHospitals)
      .catch(console.error);
  }, [state, city]);

  return (
    <div className="search-results">
      <h1>{hospitals.length} medical centers available in {city}</h1>

      <div className="hospital-list">
        {hospitals.map((hospital) => (
          <div key={hospital.name} className="hospital-card">
            <h3>{hospital.name}</h3>
            <p>{hospital.address}</p>
            <button onClick={() => setSelectedHospital(hospital)}>
              Book FREE Center Visit
            </button>
          </div>
        ))}
      </div>

      {selectedHospital && (
        <BookingModal
          hospital={selectedHospital}
          onClose={() => setSelectedHospital(null)}
        />
      )}
    </div>
  );
}
