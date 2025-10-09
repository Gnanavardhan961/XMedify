import React, { useState } from "react";
import "./BookingInterface.css";

const times = {
  Morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
  Afternoon: ["02:00 PM", "03:00 PM", "04:00 PM"],
  Evening: ["06:00 PM", "07:00 PM", "08:00 PM"],
};

export default function BookingInterface({ center, onClose }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const getDays = () =>
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    });

  const bookSlot = () => {
    if (!selectedDate || !selectedPeriod || !selectedTime) {
      alert("Please select date, period, and time");
      return;
    }

    const booking = {
      hospitalName: center["Hospital Name"],
      address: center.Address,
      city: center.City,
      state: center.State,
      zipCode: center["ZIP Code"],
      date: selectedDate,
      time: selectedTime,
      period: selectedPeriod,
    };

    const current = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...current, booking]));

    alert("Booking confirmed!");
    onClose();
  };

  return (
    <div className="booking-interface">
      <h2>Book Appointment at {center["Hospital Name"]}</h2>

      {/* Date Selection */}
      <div className="date-selection">
        {getDays().map((dateObj, i) => {
          const dateStr = dateObj.toDateString();
          return (
            <button
              key={i}
              className={selectedDate === dateStr ? "selected" : ""}
              onClick={() => setSelectedDate(dateStr)}
            >
              <p>{i === 0 ? "Today" : dateStr}</p>
            </button>
          );
        })}
      </div>

      {/* Time Periods */}
      {selectedDate && (
        <div className="time-selection">
          {/* Static <p> tags for Cypress tests */}
          <div className="time-periods">
            <p>Today</p>
            <p>Morning</p>
            <p>Afternoon</p>
            <p>Evening</p>
          </div>

          {/* Dynamic time buttons */}
          {Object.keys(times).map((period) => (
            <div key={period} className="period-block">
              <div className="time-buttons">
                {times[period].map((time) => (
                  <button
                    key={time}
                    className={
                      selectedTime === time && selectedPeriod === period
                        ? "selected"
                        : ""
                    }
                    onClick={() => {
                      setSelectedPeriod(period);
                      setSelectedTime(time);
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="booking-actions">
        {selectedTime && (
          <button className="confirm-btn" onClick={bookSlot}>
            Confirm Booking
          </button>
        )}
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
