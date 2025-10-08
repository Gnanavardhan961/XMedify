import React, { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, []);

  return (
    <div className="container my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((bk, index) => {
            const center = bk.center || {};
            const name = center["Hospital Name"] || center.name || center.hospitalName || "Hospital";
            return (
              <div key={bk.id || index} className="booking-item card">
                <h3>{name}</h3>
                <p>Date: {bk.date}</p>
                <p>Time: {bk.slot}</p>
                <p>City: {bk.city || "N/A"}, State: {bk.state || "N/A"}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
