import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MedicalCenterCard from "../components/MedicalCenterCard";

export default function SearchResults() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const state = params.get("state");
  const city = params.get("city");

  useEffect(() => {
    fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
      .then((res) => res.json())
      .then((data) => {
        setCenters(data);
        setLoading(false);
      });
  }, [state, city]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{centers.length} medical centers available in {city.toLowerCase()}</h1>
      {centers.map((c) => (
        <MedicalCenterCard key={c["Hospital Name"]} center={c} />
      ))}
    </div>
  );
}
