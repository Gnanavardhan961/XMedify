import React, { useState } from "react";

const BookingForm = ({ center, onBook }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const handleBooking = () => {
    if (!selectedDate || !timeSlot) {
      alert("Please select both date and time slot");
      return;
    }

    const newBooking = {
      center,
      date: selectedDate,
      time: timeSlot,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    const updated = [...existing, newBooking];
    localStorage.setItem("bookings", JSON.stringify(updated));

    alert("Appointment booked successfully!");
    if (onBook) onBook(newBooking);
  };

  return (
    <div className="booking-form">
      <h2>Book Appointment for {center["Hospital Name"]}</h2>

      <label>Select Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        min={today.toISOString().split("T")[0]}
        max={maxDate.toISOString().split("T")[0]}
      />

      <div className="time-slots">
        <p>Today</p>
        <button type="button" onClick={() => setTimeSlot("Morning")}>
          Morning
        </button>
        <button type="button" onClick={() => setTimeSlot("Afternoon")}>
          Afternoon
        </button>
        <button type="button" onClick={() => setTimeSlot("Evening")}>
          Evening
        </button>
      </div>

      <p>Selected Time: {timeSlot || "None"}</p>
      <button type="button" onClick={handleBooking}>
        Book FREE Center Visit
      </button>
    </div>
  );
};

export default BookingForm;
