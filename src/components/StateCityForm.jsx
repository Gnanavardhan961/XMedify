
import React, { useEffect, useState } from "react";
import { getStates, getCities } from "../api";

export default function StateCityForm({ onSearch }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingStates(true);
    setError(null);
    getStates()
      .then(data => {
        // expecting array of states
        setStates(data);
      })
      .catch(err => setError("Could not load states"))
      .finally(() => setLoadingStates(false));
  }, []);

  useEffect(() => {
    if (!selectedState) return setCities([]);
    setLoadingCities(true);
    setError(null);
    getCities(selectedState)
      .then(data => {
        setCities(data);
      })
      .catch(err => setError("Could not load cities"))
      .finally(() => setLoadingCities(false));
  }, [selectedState]);

  function submit(e) {
    e.preventDefault();
    if (!selectedState || !selectedCity) return;
    onSearch({ state: selectedState, city: selectedCity });
  }

  return (
    <form onSubmit={submit} className="state-city-form">
      <div id="state" className="form-group">
        <label htmlFor="stateSelect">State</label>
        {loadingStates ? <p>Loading states...</p> :
          <select id="stateSelect" value={selectedState} onChange={e => { setSelectedState(e.target.value); setSelectedCity(""); }}>
            <option value="">Select state</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        }
      </div>

      <div id="city" className="form-group">
        <label htmlFor="citySelect">City</label>
        {loadingCities ? <p>Loading cities...</p> :
          <select id="citySelect" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            <option value="">Select city</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        }
      </div>

      <div className="form-group">
        <button type="submit" id="searchBtn">Search</button>
      </div>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
