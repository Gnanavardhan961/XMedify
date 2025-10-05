// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="logo">XMedify</div>
      <ul className="nav-links">
        <li><Link to="/">Find Doctors</Link></li>
        <li><Link to="/">Hospitals</Link></li>
        <li><Link to="/">Medicines</Link></li>
        <li><Link to="/my-bookings">My Bookings</Link></li>
      </ul>
    </nav>
  );
}
