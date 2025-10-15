import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Search from "./Search/Search";
import MyBookings from "./pages/MyBookings";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/my-bookings" element={<MyBookings />} />
    </Routes>
  );
}
