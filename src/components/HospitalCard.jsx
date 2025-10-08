import React from "react";

function getField(obj, keys) {
  for (const k of keys) {
    if (obj[k] !== undefined) return obj[k];
    if (obj[k.toLowerCase()] !== undefined) return obj[k.toLowerCase()];
  }
  return "";
}

export default function HospitalCard({ center, onBook }) {
  const name = getField(center, ["Hospital Name", "hospitalName", "name"]) || "Unknown Hospital";
  const address = getField(center, ["Address", "address"]);
  const city = getField(center, ["City", "city"]);
  const state = getField(center, ["State", "state"]);
  const zip = getField(center, ["ZIP Code", "zip", "zipcode"]);
  const rating = getField(center, ["Overall Rating", "rating"]);

  return (
    <div className="hospital-card card">
      <div className="card-left">
        <h3>{name}</h3>
        <p>{address}</p>
        <p>{city}, {state} {zip}</p>
      </div>
      <div className="card-right">
        <p>Rating: {rating || "N/A"}</p>
        <button className="btn" onClick={onBook}>Book FREE Center Visit</button>
      </div>
    </div>
  );
}
