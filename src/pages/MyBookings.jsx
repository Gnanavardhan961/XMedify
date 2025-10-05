// MyBookings.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(stored);
  }, [location]);

  function cancelBooking(id) {
    const filtered = bookings.filter(b => b.id !== id);
    setBookings(filtered);
    localStorage.setItem("bookings", JSON.stringify(filtered));
  }

  return (
    <div className="page my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? <p>No bookings found.</p> :
        <div className="bookings-list">
          {bookings.map(b => (
            <div key={b.id} className="booking-card">
              <h3>{b.hospitalName}</h3>
              <p>{b.address}</p>
              <p>{b.city}, {b.state} - {b.zip}</p>
              <p>Appointment: {b.date} at {b.time}</p>
              <button onClick={() => cancelBooking(b.id)}>Cancel</button>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
