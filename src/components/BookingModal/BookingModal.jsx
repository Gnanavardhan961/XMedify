import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingModal({ hospital, onClose }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("Morning");

  // Max 7 days from today
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    const newBooking = {
      hospital: hospital.name,
      address: hospital.address,
      city: hospital.city,
      state: hospital.state,
      zipCode: hospital.zipCode,
      date: selectedDate,
      slot: selectedTime,
      period: selectedTime,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    existingBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    onClose();
    navigate("/my-bookings");
  };

  return (
    <div className="booking-modal">
      <h2>Book Appointment at {hospital.name}</h2>
      <p>{hospital.address}</p>
      <label>
        Select Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={today.toISOString().split("T")[0]}
          max={maxDate.toISOString().split("T")[0]}
        />
      </label>

      <div>
        <p>Select Time Slot:</p>
        {["Morning", "Afternoon", "Evening"].map((slot) => (
          <label key={slot}>
            <input
              type="radio"
              name="timeSlot"
              value={slot}
              checked={selectedTime === slot}
              onChange={() => setSelectedTime(slot)}
            />
            {slot}
          </label>
        ))}
      </div>

      <button onClick={handleBooking}>Confirm Booking</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
