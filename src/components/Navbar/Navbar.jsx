import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h3>XMedify</h3>
      <div>
        <Link to="/">Home</Link>
        <Link to="/my-bookings">MyBookings</Link>
      </div>
    </nav>
  );
}
