// src/pages/MyBookings.jsx
import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={index} className="booking-card">
            <h3>{booking.hospitalName}</h3>
            <p>{booking.date}</p>
            <p>{booking.time}</p>
          </div>
        ))
      )}
    </div>
  );
}
