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

  const getDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const bookSlot = () => {
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
    onClose();
    alert("Booking confirmed!");
  };

  return (
    <div>
      <h2>Book Appointment at {center["Hospital Name"]}</h2>
      <div>
        {getDays().map((dateObj, i) => (
          <button key={i} onClick={() => setSelectedDate(dateObj.toDateString())}>
            <p>{i === 0 ? "Today" : dateObj.toDateString()}</p>
          </button>
        ))}
      </div>
      {selectedDate && (
        <div>
          {Object.keys(times).map(period => (
            <div key={period}>
              <p>{period}</p>
              {times[period].map(time => (
                <button key={time} onClick={() => {
                  setSelectedPeriod(period);
                  setSelectedTime(time);
                }}>
                  {time}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
      {selectedTime && <button onClick={bookSlot}>Confirm Booking</button>}
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
