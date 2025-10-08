import React, { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  return (
    <section className="my-bookings">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b, idx) => (
          <div key={idx} className="booking-card">
            <h3>{b.center?.["Hospital Name"]}</h3>
            <p>
              {b.center?.Address}, {b.center?.City}, {b.center?.State}{" "}
              {b.center?.["ZIP Code"]}
            </p>
            <p>
              {b.date} - {b.slot}
            </p>
          </div>
        ))
      )}
    </section>
  );
}
