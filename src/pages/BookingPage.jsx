import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/*
 Booking rules:
 - Appointment date: today .. today + 7
 - Select a time slot. Time slot groups: Today, Morning, Afternoon, Evening (display with <p> tags)
 - Save booking in localStorage under key 'bookings'
*/

function formatDateISO(d) {
  return d.toISOString().slice(0, 10);
}

export default function BookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const center = state?.center || {};
  const city = state?.city || "";
  const stateName = state?.state || "";

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const [date, setDate] = useState(formatDateISO(today));
  const [slot, setSlot] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("Today");

  const timeSlots = {
    Today: ["09:00 AM", "10:00 AM", "11:30 AM", "02:30 PM"],
    Morning: ["08:30 AM", "09:00 AM", "10:00 AM"],
    Afternoon: ["12:00 PM", "01:00 PM", "02:30 PM"],
    Evening: ["04:00 PM", "05:00 PM", "06:00 PM"],
  };

  function saveBooking() {
    if (!slot) return alert("Select a time slot");
    const booking = {
      id: Date.now(),
      center,
      city,
      state: stateName,
      date,
      slot,
    };
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));
    alert("Booking saved!");
    navigate("/my-bookings");
  }

  const minAttr = formatDateISO(today);
  const maxAttr = formatDateISO(maxDate);

  const centerName = center["Hospital Name"] || center.name || center.hospitalName || "Hospital";

  return (
    <div className="container booking-page">
      <h2>Book center visit</h2>
      <div className="card booking-card">
        <div>
          <h3>{centerName}</h3>
          <p>{center.Address || center.address}</p>
          <p>{city}, {stateName}</p>
        </div>

        <div className="booking-controls">
          <label>
            Select date:
            <input
              type="date"
              value={date}
              min={minAttr}
              max={maxAttr}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <div className="time-groups">
            <p>Today</p>
            <div className="slots">
              {timeSlots.Today.map((t) => (
                <button
                  key={t}
                  className={`slot-btn ${slot === t ? "selected" : ""}`}
                  onClick={() => { setSlot(t); setTimeOfDay("Today"); }}
                >
                  {t}
                </button>
              ))}
            </div>

            <p>Morning</p>
            <div className="slots">
              {timeSlots.Morning.map((t) => (
                <button
                  key={t}
                  className={`slot-btn ${slot === t ? "selected" : ""}`}
                  onClick={() => { setSlot(t); setTimeOfDay("Morning"); }}
                >
                  {t}
                </button>
              ))}
            </div>

            <p>Afternoon</p>
            <div className="slots">
              {timeSlots.Afternoon.map((t) => (
                <button
                  key={t}
                  className={`slot-btn ${slot === t ? "selected" : ""}`}
                  onClick={() => { setSlot(t); setTimeOfDay("Afternoon"); }}
                >
                  {t}
                </button>
              ))}
            </div>

            <p>Evening</p>
            <div className="slots">
              {timeSlots.Evening.map((t) => (
                <button
                  key={t}
                  className={`slot-btn ${slot === t ? "selected" : ""}`}
                  onClick={() => { setSlot(t); setTimeOfDay("Evening"); }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="selected">
            <p>Selected date: {date}</p>
            <p>Time of day: <strong>{timeOfDay}</strong></p>
            <p>Time slot: <strong>{slot || "None"}</strong></p>
          </div>

          <div>
            <button className="btn" onClick={saveBooking}>Confirm Booking</button>
          </div>
        </div>
      </div>
    </div>
  );
}
