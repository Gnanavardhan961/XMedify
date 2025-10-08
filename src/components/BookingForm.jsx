import React, { useState } from "react";
import "./BookingForm.css";

const BookingForm = ({ hospital, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!date || !time) {
      alert("Please select both date and time.");
      return;
    }

    const newBooking = {
      hospital: hospital["Hospital Name"],
      address: hospital.Address,
      city: hospital.City,
      state: hospital.State,
      zip: hospital["ZIP Code"],
      rating: hospital["Hospital overall rating"],
      date,
      time,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, newBooking]));

    alert("Appointment booked successfully!");
    onClose();
  };

  return (
    <div className="booking-card">
      <h2>Book FREE Center Visit</h2>
      <form onSubmit={handleBooking}>
        <label>Select Date (within a week)</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today.toISOString().split("T")[0]}
          max={nextWeek.toISOString().split("T")[0]}
        />

        <label>Select Time</label>
        <div className="time-options">
          {["Morning", "Afternoon", "Evening"].map((t) => (
            <label key={t}>
              <input
                type="radio"
                name="time"
                value={t}
                onChange={(e) => setTime(e.target.value)}
              />
              <p>{t}</p>
            </label>
          ))}
        </div>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
