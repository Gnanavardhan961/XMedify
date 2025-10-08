import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";  // <-- import the CSS file

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">XMedify</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/search">Find Doctors</Link>
          <a href="#hospitals">Hospitals</a>
          <a href="#medicines">Medicines</a>
          <Link to="/my-bookings">My Bookings</Link>
        </nav>
      </div>
    </header>
  );
}
