// BookingPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function getDefaultSlots() {
  return [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];
}

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const hospital = location.state?.hospital;
  const city = location.state?.city || "";
  const state = location.state?.state || "";

  if (!hospital) {
    return <div><p>No hospital selected.</p></div>;
  }

  const today = new Date();
  function formatDateISO(d) { return d.toISOString().slice(0,10); }
  const minDate = formatDateISO(today);
  const maxDate = formatDateISO(new Date(Date.now() + 7*24*60*60*1000));

  const [date, setDate] = useState(minDate);
  const [slot, setSlot] = useState("");
  const [bookFor, setBookFor] = useState("Today"); // text like Today/Morning/Afternoon/Evening

  function saveBooking() {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      id: Date.now(),
      hospitalName: hospital["Hospital Name"] || hospital.hospital_name || hospital.name,
      address: hospital["Address"] || hospital.address,
      city,
      state,
      zip: hospital["ZIP Code"] || hospital.zip,
      date,
      time: slot,
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    // navigate to My Bookings
    navigate("/my-bookings");
  }

  const slots = getDefaultSlots();

  return (
    <div className="page booking">
      <h1>Book Appointment</h1>
      <h3>{hospital["Hospital Name"] || hospital.hospital_name || hospital.name}</h3>
      <p>{hospital["Address"]}</p>

      <div className="booking-controls">
        <label>
          Choose date (within 7 days)
          <input type="date" min={minDate} max={maxDate} value={date} onChange={e => setDate(e.target.value)} />
        </label>

        <p><strong>Time of day</strong></p>
        <p>{/* Text display for time of day — these must be <p> tags */}
          <p>Today</p>
          <p>Morning</p>
          <p>Afternoon</p>
          <p>Evening</p>
        </p>

        <label>
          Choose time slot
          <select value={slot} onChange={e => setSlot(e.target.value)}>
            <option value="">Select slot</option>
            {slots.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>

        <div className="actions">
          <button disabled={!slot} onClick={saveBooking}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}
