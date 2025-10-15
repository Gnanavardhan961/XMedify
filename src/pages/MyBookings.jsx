import React, { useEffect, useState } from "react";
import "./MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const localBookings = localStorage.getItem("bookings") || "[]";
    setBookings(JSON.parse(localBookings));
  }, []);

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
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
