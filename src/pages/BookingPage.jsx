import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const center = location.state?.center;

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  if (!center) return <p>No center selected.</p>;

  const today = new Date().toISOString().split("T")[0];
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const maxDate = nextWeek.toISOString().split("T")[0];

  function handleConfirm() {
    if (!date || !slot) return alert("Select date and time");
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      id: Date.now(),
      center,
      date,
      slot,
      city: center.City || center.city,
      state: center.State || center.state,
    };
    localStorage.setItem("bookings", JSON.stringify([...bookings, newBooking]));
    alert("Booking confirmed!");
    navigate("/my-bookings");
  }

  return (
    <div className="booking-section card">
      <h1>Book Appointment at {center["Hospital Name"] || center.name}</h1>
      <div className="field">
        <label>Date</label>
        <input
          type="date"
          value={date}
          min={today}
          max={maxDate}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Time Slot</label>
        <p>Today</p>
        <select value={slot} onChange={(e) => setSlot(e.target.value)}>
          <option value="">-- Select slot --</option>
          <option value="09:00 AM">Morning - 09:00 AM</option>
          <option value="11:00 AM">Morning - 11:00 AM</option>
          <option value="02:00 PM">Afternoon - 02:00 PM</option>
          <option value="04:00 PM">Evening - 04:00 PM</option>
        </select>
      </div>
      <button className="btn" onClick={handleConfirm}>Confirm Booking</button>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
}
