import React, { useEffect, useState } from "react";
import "./BookingForm.css";


export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem("bookings") || "[]"));
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {!bookings.length && <p>No bookings found</p>}
      {bookings.map((b, i) => (
        <div key={i}>
          <h3>{b.hospitalName}</h3>
          <p>{b.address}</p>
          <p>{b.city}, {b.state} {b.zipCode}</p>
          <p>Date: {b.date}</p>
          <p>Time: {b.time} ({b.period})</p>
        </div>
      ))}
    </div>
  );
}
