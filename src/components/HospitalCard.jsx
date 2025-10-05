// HospitalCard.js
import React from "react";

export default function HospitalCard({ hospital, onBook }) {
  // expected hospital fields: Hospital Name, Address, City, State, ZIP Code, Overall Rating
  const name = hospital["Hospital Name"] || hospital.hospital_name || hospital.name;
  const address = hospital["Address"] || hospital.address;
  const zip = hospital["ZIP Code"] || hospital.zip || hospital.postal_code;
  const rating = hospital["Overall Rating"] ?? hospital.rating;

  return (
    <div className="hospital-card">
      <h3>{name}</h3>
      <p>{address}</p>
      <p>{hospital.City || hospital.city || ""}, {hospital.State || hospital.state}</p>
      <p>ZIP: {zip}</p>
      <p>Rating: {rating ?? "N/A"}</p>
      <button onClick={() => onBook(hospital)}>Book FREE Center Visit</button>
    </div>
  );
}
