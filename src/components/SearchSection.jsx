import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchSection.css';

const SearchSection = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showStateList, setShowStateList] = useState(false);
  const [showCityList, setShowCityList] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all states
  useEffect(() => {
    fetch('https://meddata-backend.onrender.com/states')
      .then((res) => res.json())
      .then(setStates)
      .catch(() => setStates([]));
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      setIsCityLoading(true);
      fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then((res) => res.json())
        .then((data) => {
          setCities(data);
          setIsCityLoading(false);
        })
        .catch(() => {
          setCities([]);
          setIsCityLoading(false);
        });
    }
  }, [selectedState]);

  // Select a state
  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);
    setShowStateList(false);
    setShowCityList(false);
  };

  // Select a city
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCityList(false);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedState) {
      alert('Please select a state first!');
      return;
    }
    if (!selectedCity) {
      alert('Please select a city!');
      return;
    }
    navigate('/search', {
      state: { state: selectedState, city: selectedCity },
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* State Dropdown */}
      <div id="state" className="dropdown-wrapper">
        <label>State</label>
        <div
          className="dropdown"
          tabIndex={0}
          onClick={() => setShowStateList((prev) => !prev)}
        >
          {selectedState || 'Select State'}
        </div>

        {showStateList && (
          <ul className="dropdown-list">
            {states.length > 0 ? (
              states.map((state) => (
                <li key={state} onClick={() => handleStateSelect(state)}>
                  {state}
                </li>
              ))
            ) : (
              <li className="disabled">Loading states...</li>
            )}
          </ul>
        )}
      </div>

      {/* City Dropdown */}
      <div id="city" className="dropdown-wrapper">
        <label>City</label>
        <div
          className={`dropdown ${!selectedState ? 'disabled' : ''}`}
          tabIndex={0}
          onClick={() =>
            selectedState && setShowCityList((prev) => !prev)
          }
        >
          {selectedCity || 'Select City'}
        </div>

        {showCityList && (
          <ul className="dropdown-list">
            {isCityLoading ? (
              <li className="disabled">Loading cities...</li>
            ) : cities.length > 0 ? (
              cities.map((city) => (
                <li key={city} onClick={() => handleCitySelect(city)}>
                  {city}
                </li>
              ))
            ) : (
              <li className="disabled">No cities available</li>
            )}
          </ul>
        )}
      </div>

      {/* Search Button */}
      <button type="submit" id="searchBtn" className="search-btn">
        Search
      </button>
    </form>
  );
};

export default SearchSection;
