import React from "react";

/*
 Expected center object fields (from backend):
  - "Hospital Name" or "hospitalName" or similar
  - "Address", "City", "State", "ZIP Code", "Overall Rating"
 We'll attempt multiple keys for safety.
*/

function getField(obj, possibleKeys) {
  for (const k of possibleKeys) {
    if (obj[k] !== undefined) return obj[k];
    const lower = k.toLowerCase();
    if (obj[lower] !== undefined) return obj[lower];
  }
  return "";
}

export default function HospitalCard({ center, onBook }) {
  const name =
    getField(center, ["Hospital Name", "hospitalName", "name"]) || "Unknown Hospital";
  const address = getField(center, ["Address", "address"]);
  const city = getField(center, ["City", "city"]);
  const state = getField(center, ["State", "state"]);
  const zip = getField(center, ["ZIP Code", "zip", "zipcode"]);
  const rating = getField(center, ["Overall Rating", "rating", "overallRating"]);

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
