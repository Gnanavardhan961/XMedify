// src/components/BookingModal/BookingModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingModal.css";

export default function BookingModal({ hospital }) {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("Morning");

  // Generate min/max dates for next 7 days
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date(today.setDate(today.getDate() + 7))
    .toISOString()
    .split("T")[0];

  const handleBooking = (e) => {
    e.preventDefault();
    if (!date) {
      alert("Please select a date");
      return;
    }

    const newBooking = {
      hospital: hospital.name,
      address: hospital.address,
      city: hospital.city,
      state: hospital.state,
      zipCode: hospital.zipCode,
      date,
      slot,
      period: slot,
    };

    // Retrieve existing bookings
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));

    // Navigate to My Bookings page
    navigate("/my-bookings");
  };

  return (
    <div className="booking-modal">
      <h3>{hospital.name}</h3>
      <p>{hospital.address}</p>
      <p>
        {hospital.city}, {hospital.state} {hospital.zipCode}
      </p>

      <form onSubmit={handleBooking}>
        <label>
          Select Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={minDate}
            max={maxDate}
          />
        </label>

        <label>
          Select Time Slot:
          <select value={slot} onChange={(e) => setSlot(e.target.value)}>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </label>

        <button type="submit">Book FREE Center Visit</button>
      </form>
    </div>
  );
}
