import React, { useEffect, useState } from "react";
import "./MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div id="bookings-list">
          {bookings.map((b, index) => (
            <div key={index} className="booking-card">
              <h4>{b.hospitalName}</h4>
              <p>{b.city}, {b.state} - {b.zipCode}</p>
              <p>
                <strong>Date:</strong> {b.date} | <strong>Time:</strong> {b.time}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
