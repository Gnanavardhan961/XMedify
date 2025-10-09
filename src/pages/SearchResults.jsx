import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookingInterface from "./BookingInterface";

export default function SearchResults() {
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { state, city } = location.state || {};

  useEffect(() => {
    if (state && city) {
      fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
        .then(res => res.json())
        .then(data => {
          setMedicalCenters(data);
          setLoading(false);
        });
    }
  }, [state, city]);

  const [selectedCenter, setSelectedCenter] = useState(null);

  return (
    <div>
      <h1>{medicalCenters.length} medical centers available in {city?.toLowerCase()}</h1>
      {loading && <div>Loading...</div>}
      {!loading && medicalCenters.map((center, index) => (
        <div key={index}>
          <h3>{center["Hospital Name"]}</h3>
          <p>{center.Address}</p>
          <p>{center.City}, {center.State} {center["ZIP Code"]}</p>
          <p>Rating: {center["Overall Rating"]}</p>
          <button onClick={() => setSelectedCenter(center)}>
            Book FREE Center Visit
          </button>
        </div>
      ))}
      {selectedCenter && <BookingInterface center={selectedCenter} onClose={() => setSelectedCenter(null)} />}
    </div>
  );
}
