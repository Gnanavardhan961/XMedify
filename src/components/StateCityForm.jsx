// src/components/StateCityForm.jsx
import React, { useEffect, useState } from "react";
import { getStates, getCities } from "../Api";

export default function StateCityForm({ onSearch }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selState, setSelState] = useState("");
  const [selCity, setSelCity] = useState("");
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoadingStates(true);
    setError("");
    getStates()
      .then(data => {
        if (!mounted) return;
        setStates(Array.isArray(data) ? data : []);
      })
      .catch(err => setError("Failed to load states"))
      .finally(() => setLoadingStates(false));
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (!selState) {
      setCities([]);
      return;
    }
    let mounted = true;
    setLoadingCities(true);
    setError("");
    getCities(selState)
      .then(data => {
        if (!mounted) return;
        setCities(Array.isArray(data) ? data : []);
      })
      .catch(() => setError("Failed to load cities"))
      .finally(() => setLoadingCities(false));
    return () => (mounted = false);
  }, [selState]);

  function submit(e) {
    e.preventDefault();
    if (!selState || !selCity) {
      setError("Please choose state and city");
      return;
    }
    onSearch({ state: selState, city: selCity });
  }

  return (
    <form onSubmit={submit} className="state-city-form">
      <div id="state" className="form-group">
        <label htmlFor="stateSelect">State</label>
        {loadingStates ? (
          <p>Loading states...</p>
        ) : (
          <select id="stateSelect" value={selState} onChange={e => { setSelState(e.target.value); setSelCity(""); }}>
            <option value="">Select state</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
      </div>

      <div id="city" className="form-group">
        <label htmlFor="citySelect">City</label>
        {loadingCities ? (
          <p>Loading cities...</p>
        ) : (
          <select id="citySelect" value={selCity} onChange={e => setSelCity(e.target.value)}>
            <option value="">Select city</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        )}
      </div>

      <div className="form-group">
        <button type="submit" id="searchBtn">Search</button>
      </div>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
