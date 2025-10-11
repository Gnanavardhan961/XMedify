import React, { useEffect, useState } from "react";
import "./MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(savedBookings);
  }, []);

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((booking, idx) => (
          <div key={idx} className="booking-card">
            <h3>{booking.hospital}</h3>
            <p>{booking.address}</p>
            <p>
              {booking.city}, {booking.state} {booking.zipCode}
            </p>
            <p>Date: {booking.date}</p>
            <p>
              Time: {booking.slot} <strong>({booking.period})</strong>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
