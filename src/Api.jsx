
export const BACKEND = "https://meddata-backend.onrender.com";

async function longFetch(url, options = {}, timeout = 75000) {

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export function getStates() {
  return longFetch(`${BACKEND}/states`);
}

export function getCities(state) {
  // state passed already sanitized (e.g., Alaska)
  return longFetch(`${BACKEND}/cities/${encodeURIComponent(state)}`);
}

export function getMedicalCenters(state, city) {
  const url = `${BACKEND}/data?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`;
  return longFetch(url);
}
