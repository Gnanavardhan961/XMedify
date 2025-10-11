// src/components/BookingModal/BookingModal.jsx
import React, { useState } from "react";
import "./BookingModal.css";

export default function BookingModal({ hospital, onClose }) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("Morning");

  // Generate min and max dates for the next 7 days
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

    bookings.push(newBooking);
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

        <div className="booking-inputs">
          <label>
            Select Date:
            <input
              type="date"
              value={date}
              min={minDate}
              max={maxDate}
              onChange={(e) => setDate(e.target.value)}
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
        </div>

        <button className="book-btn" onClick={handleBooking}>
          Book Appointment
        </button>
      </div>
    </div>
  );
}
