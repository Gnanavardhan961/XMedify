// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import SearchResults from "./pages/SearchResults";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
