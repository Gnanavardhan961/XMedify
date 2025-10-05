import React from "react";

export default function HospitalCard({ hospital, onBook }) {
  const name = hospital["Hospital Name"] || hospital.hospital_name || hospital.name || "Hospital";
  const address = hospital["Address"] || hospital.address || "";
  const city = hospital["City"] || hospital.city || "";
  const state = hospital["State"] || hospital.state || "";
  const zip = hospital["ZIP Code"] || hospital.zip || "";
  const rating = hospital["Overall Rating"] ?? hospital.rating ?? "N/A";

  return (
    <div className="hospital-card">
      <h3>{name}</h3>
      <p>{address}</p>
      <p>{city}, {state}</p>
      <p>ZIP: {zip}</p>
      <p>Rating: {rating}</p>
      <button onClick={() => onBook(hospital)}>Book FREE Center Visit</button>
    </div>
  );
}
