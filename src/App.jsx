// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import SearchResults from "./pages/SearchResults";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-main">
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

export default App;
