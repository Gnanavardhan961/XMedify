import React, { useState } from "react";


/*
 Booking modal:
 - Date restricted to today .. today+7
 - Time slot selection
 - Save to localStorage key 'bookings'
 - Display p tags for Today/Morning/Afternoon/Evening labels
*/

const TIMESLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
];

function toInputDate(d) {
  return d.toISOString().slice(0, 10);
}

export default function BookingModal({ center, onClose }) {
  const today = new Date();
  const max = new Date();
  max.setDate(today.getDate() + 7);

  const [date, setDate] = useState(toInputDate(today));
  const [time, setTime] = useState(TIMESLOTS[0]);
  const [saving, setSaving] = useState(false);

  const name = center["Hospital Name"] || center.name || "Hospital";

  function save() {
    setSaving(true);
    try {
      const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
      const booking = {
        id: Date.now(),
        hospital: name,
        address: center["Address"] || center.address || "",
        city: center["City"] || center.city || "",
        state: center["State"] || center.state || "",
        zip: center["ZIP Code"] || center.zip || "",
        rating: center["Overall Rating"] ?? center["Hospital overall rating"] ?? "N/A",
        date,
        time,
      };
      existing.push(booking);
      localStorage.setItem("bookings", JSON.stringify(existing));
      alert("Booking saved");
      onClose();
    } catch (e) {
      console.error(e);
      alert("Failed to save booking");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close" onClick={onClose}>×</button>
        <h2>Book Appointment</h2>
        <h3>{name}</h3>

        <div className="time-labels">
          <p>Today</p>
          <p>Morning</p>
          <p>Afternoon</p>
          <p>Evening</p>
        </div>

        <label>
          Choose date:
          <input
            type="date"
            value={date}
            min={toInputDate(today)}
            max={toInputDate(max)}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Choose time slot:
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            {TIMESLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>

        <div className="actions">
          <button onClick={save} disabled={saving}>Confirm</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}
