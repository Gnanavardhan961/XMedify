import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HospitalDetails = ({ hospital }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select both date and time slot!");
      return;
    }

    const booking = {
      id: Date.now(),
      hospital: hospital.name,
      date: selectedDate,
      slot: selectedSlot,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));

    alert("Appointment booked successfully!");
    navigate("/my-bookings");
  };

  return (
    <div className="booking-container">
      <h2>{hospital.name}</h2>

      <label>Select Date</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <p>Select Time Slot</p>
      <div className="slot-options">
        {["Morning", "Afternoon", "Evening"].map((slot) => (
          <button
            key={slot}
            className={`slot-btn ${
              selectedSlot === slot ? "selected" : ""
            }`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      <button id="bookBtn" onClick={handleBooking} className="book-btn">
        Book Appointment
      </button>
    </div>
  );
};

export default HospitalDetails;
