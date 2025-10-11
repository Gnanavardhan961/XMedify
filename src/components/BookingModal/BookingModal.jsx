// src/components/BookingModal/BookingModal.jsx
import React, { useState } from "react";

export default function BookingModal({ hospital, onClose }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = ["Morning", "Afternoon", "Evening"];

  const handleBook = () => {
    if (!selectedDate || !selectedTime) return alert("Select date and time");

    const booking = {
      hospitalName: hospital.name,
      date: selectedDate,
      time: selectedTime,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, booking]));

    alert("Booking Confirmed!");
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{hospital.name}</h3>
        <p>{hospital.address}</p>
        <p>{hospital.city}, {hospital.state} {hospital.zipCode}</p>

        <label>
          Select Date:
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>

        <p>Today</p>
        <div className="time-slots">
          {timeSlots.map((slot) => (
            <p
              key={slot}
              onClick={() => setSelectedTime(slot)}
              style={{
                cursor: "pointer",
                fontWeight: selectedTime === slot ? "bold" : "normal",
              }}
            >
              {slot}
            </p>
          ))}
        </div>

        <button onClick={handleBook}>Book FREE Center Visit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
