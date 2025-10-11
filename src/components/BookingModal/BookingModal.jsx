// src/components/BookingModal/BookingModal.jsx
import React, { useState } from "react";
import "./BookingModal.css";

export default function BookingModal({ hospital, onClose }) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("Morning");

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date(today.setDate(today.getDate() + 7))
    .toISOString()
    .split("T")[0];

  const handleBooking = () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    bookings.push({
      hospital: hospital.name,
      address: hospital.address,
      city: hospital.city,
      state: hospital.state,
      zipCode: hospital.zipCode,
      date,
      slot,
      period: slot,
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));
    alert("Booking successful!");
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="booking-modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Book Appointment at {hospital.name}</h2>
        <p>{hospital.address}</p>
        <p>
          {hospital.city}, {hospital.state} {hospital.zipCode}
        </p>

        <label>
          Date:
          <input
            type="date"
            min={minDate}
            max={maxDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <p>Today</p>
        <p>
          <span onClick={() => setSlot("Morning")}>Morning</span>{" "}
          <span onClick={() => setSlot("Afternoon")}>Afternoon</span>{" "}
          <span onClick={() => setSlot("Evening")}>Evening</span>
        </p>

        <button onClick={handleBooking}>Book Appointment</button>
      </div>
    </div>
  );
}
