import React from "react";

export default function HospitalCard({ center, onBook }) {
  return (
    <div className="hospital-card card">
      <div className="card-left">
        <h3>{center["Hospital Name"] || center.hospitalName}</h3>
        <p>{center.Address || center.address}</p>
        <p>{center.City || center.city}, {center.State || center.state} {center["ZIP Code"] || center.zip}</p>
      </div>
      <div className="card-right">
        <p>Rating: {center["Overall Rating"] || "N/A"}</p>
        <button className="btn" onClick={onBook}>Book FREE Center Visit</button>
      </div>
    </div>
  );
}
