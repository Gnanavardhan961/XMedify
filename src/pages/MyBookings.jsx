import React, { useEffect, useState } from "react";
import "./MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);
  }, []);

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i} className="booking-card">
            <h3>{b.hospital || b.hospitalName}</h3>
            <p>{b.address}</p>
            <p>
              {b.city}, {b.state} {b.zipCode}
            </p>
            <p>Date: {b.date}</p>
            <p>
              Time: {b.time || b.slot} ({b.period ? b.period : "Morning"})
            </p>
          </div>
        ))
      )}
    </div>
  );
}
