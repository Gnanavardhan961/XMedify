// src/pages/BookingPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function isoDate(d) { return d.toISOString().slice(0, 10); }

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const hospital = location.state?.hospital;
  const city = location.state?.city || "";
  const state = location.state?.state || "";

  if (!hospital) return <div><p>No hospital selected</p></div>;

  const today = new Date();
  const min = isoDate(today);
  const max = isoDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

  const [date, setDate] = useState(min);
  const [time, setTime] = useState("");

  const slots = [
    "08:00 AM","08:30 AM","09:00 AM","09:30 AM","10:00 AM","10:30 AM",
    "11:00 AM","01:00 PM","01:30 PM","02:00 PM","03:00 PM","04:00 PM"
  ];

  function save() {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const booking = {
      id: Date.now(),
      hospitalName: hospital["Hospital Name"] || hospital.hospital_name || hospital.name,
      address: hospital["Address"] || hospital.address,
      city,
      state,
      zip: hospital["ZIP Code"] || hospital.zip || "",
      date,
      time
    };
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    navigate("/my-bookings");
  }

  return (
    <div className="page booking">
      <h1>Book Appointment</h1>
      <h3>{hospital["Hospital Name"] || hospital.hospital_name || hospital.name}</h3>
      <p>{hospital["Address"] || hospital.address}</p>
      <p>{city}, {state}</p>

      <div className="booking-form">
        <label>
          Choose date (within 7 days)
          <input type="date" min={min} max={max} value={date} onChange={e => setDate(e.target.value)} />
        </label>

        {/* Time of day texts required as <p> */}
        <div className="time-of-day">
          <p>Today</p>
          <p>Morning</p>
          <p>Afternoon</p>
          <p>Evening</p>
        </div>

        <label>
          Choose time slot
          <select value={time} onChange={e => setTime(e.target.value)}>
            <option value="">Select slot</option>
            {slots.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>

        <div className="actions">
          <button disabled={!time} onClick={save}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}
