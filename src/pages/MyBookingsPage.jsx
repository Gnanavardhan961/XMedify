import React, { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const b = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(b);
  }, []);

  return (
    <div className="container my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="bookings-list">
          {bookings.map((bk) => {
            const center = bk.center || {};
            const name = center["Hospital Name"] || center.name || "Hospital";
            return (
              <li key={bk.id} className="booking-item card">
                <h3>{name}</h3>
                <p>Date: {bk.date}</p>
                <p>Time: {bk.slot}</p>
                <p>City: {bk.city}, State: {bk.state}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
