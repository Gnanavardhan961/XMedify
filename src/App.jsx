import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import SearchResults from "./SearchResults";
import MyBookings from "./MyBookings";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/my-bookings" element={<MyBookings />} /> {/* Critical path */}
    </Routes>
  </Router>
);

export default App;
