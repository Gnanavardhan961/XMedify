import { useNavigate } from "react-router-dom";

export default function MedicalCenterCard({ center }) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/my-bookings", { state: { center } });
  };

  return (
    <div className="center-card">
      <h3>{center["Hospital Name"]}</h3>
      <p>{center.Address}</p>
      <p>{center.City}, {center.State} - {center["ZIP Code"]}</p>
      <p>Rating: {center["Hospital overall rating"]}</p>
      <button onClick={handleBook}>Book FREE Center Visit</button>
    </div>
  );
}
