import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings available</p>
      ) : (
        <ul>
          {bookings.map((b, index) => (
            <li key={index} className="booking-item">
              <p>{b["Hospital Name"]}</p>
              <p>{b.City}</p>
              <p>{b.State}</p>
              <p>{b.bookingDate}</p>
              <p>{b.bookingType}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
