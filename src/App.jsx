// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SearchResults from "./pages/SearchResults";
import MyBookings from "./pages/MyBookings";
import "./App.css";


const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/search" element={<SearchResults />} />
    <Route path="/my-bookings" element={<MyBookings />} />
  </Routes>
);

export default App;
