import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const center = location.state?.center;

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  if (!center) {
    return (
      <div className="container">
        <h2>No center selected</h2>
      </div>
    );
  }

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
    <div className="booking-section card container">
      <h2>Book Appointment at {center["Hospital Name"] || center.name}</h2>

      <div className="field">
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className="field">
        <label>Time Slot</label>
        <select value={slot} onChange={(e) => setSlot(e.target.value)}>
          <option value="">-- Select slot --</option>
          <option value="09:00 AM">09:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="02:00 PM">02:00 PM</option>
          <option value="04:00 PM">04:00 PM</option>
        </select>
      </div>

      <button className="btn" onClick={handleConfirm}>Confirm Booking</button>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
}
