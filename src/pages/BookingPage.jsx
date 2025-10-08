import React, { useState } from "react";

export default function BookingPage({ center, onClose }) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

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
    onClose();
  }

  return (
    <div className="booking-section card">
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
      <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
    </div>
  );
}
