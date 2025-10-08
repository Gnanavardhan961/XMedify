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
      {bookings.length === 0 ? <p>No bookings yet.</p> :
        bookings.map((b, idx) => (
          <div key={idx} className="booking-card">
            <h3>{b.hospitalName}</h3>
            <p>{b.address}, {b.city}, {b.state} {b.zip}</p>
            <p>{b.date} - {b.timeSlot}</p>
          </div>
      ))}
    </section>
  );
}
