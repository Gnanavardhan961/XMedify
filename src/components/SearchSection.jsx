import React, { useState, useEffect } from 'react';

const SearchSection = ({ onSearch }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetch('https://meddata-backend.onrender.com/states')
      .then(res => res.json())
      .then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then(res => res.json())
        .then(setCities);
    }
  }, [selectedState]);

  return (
    <form onSubmit={e => {
      e.preventDefault();
      if (selectedState && selectedCity) onSearch(selectedState, selectedCity);
    }}>
      <div id="state">
        <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
          <option value="">Select State</option>
          {states.map(state => <option key={state}>{state}</option>)}
        </select>
        <ul style={{display:"none"}}>
          {states.map(state => <li key={state}>{state}</li>)}
        </ul>
      </div>
      <div id="city">
        <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map(city => <option key={city}>{city}</option>)}
        </select>
        <ul style={{display:"none"}}>
          {cities.map(city => <li key={city}>{city}</li>)}
        </ul>
      </div>
      <button type="submit" id="searchBtn">Search</button>
    </form>
  );
};

export default SearchSection;
