import React, { useState } from "react";

export default function BookingModal({ hospital, onClose }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBook = () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push({ ...hospital, date, time });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Appointment booked!");
    onClose(); // Close the modal after booking
  };

  return (
    <div className="booking-modal">
      <h3>Book Appointment for {hospital["Hospital Name"] || hospital.name}</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        id="appointment-date"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        id="appointment-time"
      />
      <button onClick={handleBook}>Book</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
