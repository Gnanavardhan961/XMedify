// src/Search/Search.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookingModal from "../components/BookingModal/BookingModal";

export default function Search() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const city = searchParams.get("city");

  useEffect(() => {
    if (state && city) {
      fetch(
        `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
      )
        .then((res) => res.json())
        .then((data) => setHospitals(data))
        .catch(console.error);
    }
  }, [state, city]);

  if (!state || !city) {
    return <p>Please select a state and city from the homepage.</p>;
  }

  return (
    <div className="search-page">
      <h1>
        {hospitals.length} medical centers available in {city}
      </h1>

      {hospitals.length === 0 && (
        <p>No medical centers found for {city}.</p>
      )}

      {hospitals.map((hospital, idx) => (
        <div key={idx} className="hospital-card">
          <h3>{hospital.name}</h3>
          <p>{hospital.address}</p>
          <p>
            {hospital.city}, {hospital.state} {hospital.zipCode}
          </p>
          <p>Overall Rating: {hospital.overallRating}</p>
          <button onClick={() => setSelectedHospital(hospital)}>
            Book FREE Center Visit
          </button>
        </div>
      ))}

      {selectedHospital && (
        <BookingModal
          hospital={selectedHospital}
          onClose={() => setSelectedHospital(null)}
        />
      )}
    </div>
  );
}
