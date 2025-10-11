import React, { useState } from "react";

export default function BookingModal({ hospital, onClose }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const newBooking = {
      hospitalName: hospital.name,
      city: hospital.city,
      state: hospital.state,
      zipCode: hospital.zipCode,
      date: selectedDate,
      time: selectedTime,
    };

    localStorage.setItem("bookings", JSON.stringify([...bookings, newBooking]));
    onClose();
    alert("Booking successful!");
  };

  return (
    <div className="booking-modal">
      <button onClick={onClose}>Close</button>
      <h3>Book Appointment at {hospital.name}</h3>

      <div className="booking-dates">
        <p>Today</p>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0]}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="booking-times">
        <p>Morning</p>
        <p>Afternoon</p>
        <p>Evening</p>

        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">Select Time Slot</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}
