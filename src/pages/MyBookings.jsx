import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  if (bookings.length === 0) return <p>No bookings yet.</p>;

  return (
    <div>
      <h1>My Bookings</h1>
      <div id="bookings-container">
        {bookings.map((booking, index) => (
          <div key={index} className="booking-card">
            <h3>{booking.hospitalName}</h3>
            <p>City: {booking.city}</p>
            <p>State: {booking.state}</p>
            <p>ZIP: {booking.zipCode}</p>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
