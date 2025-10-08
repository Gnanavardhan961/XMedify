import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all states on load
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://meddata-backend.onrender.com/states");
        const data = await res.json();
        setStates(data);
      } catch (err) {
        console.error("Error fetching states:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch cities for selected state
  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `https://meddata-backend.onrender.com/cities/${selectedState}`
          );
          const data = await res.json();
          setCities(data);
        } catch (err) {
          console.error("Error fetching cities:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchCities();
    }
  }, [selectedState]);

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedState || !selectedCity) return alert("Select both fields!");
    navigate(`/search?state=${selectedState}&city=${selectedCity}`);
  };

  return (
    <section className="search-section">
      <form onSubmit={handleSearch}>
        <div id="state">
          <label>Select State:</label>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setCities([]); // reset city list
            }}
          >
            <option value="">-- Select State --</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div id="city">
          <label>Select City:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" id="searchBtn">
          {loading ? "Loading..." : "Search"}
        </button>
      </form>
    </section>
  );
};

export default SearchSection;
