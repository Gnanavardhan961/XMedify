import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    if (location.state?.center) {
      const newBooking = {
        center: location.state.center,
        date: new Date().toLocaleDateString(),
        time: "Morning",
      };
      const updated = [...saved, newBooking];
      localStorage.setItem("bookings", JSON.stringify(updated));
      setBookings(updated);
    } else {
      setBookings(saved);
    }
  }, [location.state]);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.map((b, idx) => (
        <div key={idx}>
          <h3>{b.center["Hospital Name"]}</h3>
          <p>{b.center.City}, {b.center.State}</p>
          <p>Date: {b.date}</p>
          <p>Time: {b.time}</p>
        </div>
      ))}
    </div>
  );
}
