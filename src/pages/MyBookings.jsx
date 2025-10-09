import React, { useEffect, useState } from "react";
import "./MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load all saved bookings from localStorage
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);
  }, []);

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>

      {/* No bookings found message */}
      {bookings.length === 0 && <p>No bookings found</p>}

      {/* Render each booking */}
      {bookings.map((b, i) => (
        <div key={i} className="booking-card">
          <h3>{b.hospital || b.hospitalName}</h3>
          <p>{b.address}</p>
          <p>
            {b.city}, {b.state} {b.zipCode}
          </p>
          <p>Date: {b.date}</p>
          <p>Time: {b.slot || b.time} ({b.period || "Morning"})</p>
        </div>
      ))}
    </div>
  );
}
