import React, { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(data);
  }, []);

  return (
    <div className="my-bookings container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id} className="card">
              <p><strong>Center:</strong> {b.center["Hospital Name"] || b.center.name}</p>
              <p><strong>State/City:</strong> {b.state}, {b.city}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time Slot:</strong> {b.slot}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
