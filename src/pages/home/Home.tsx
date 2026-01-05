import { useNavigate } from "react-router-dom";
import type { BirthDate } from "../../types/astrology";
import { calculateAllSigns } from "../../utils/astrologyCalculators";
import DateInput from "../../components/DateInput/DateInput";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleDateSubmit = (date: BirthDate) => {
    const calculatedSigns = calculateAllSigns(date);
    navigate("/results", {
      state: {
        signs: calculatedSigns,
        birthDate: date,
      },
    });
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1 className="home-title">
          <img
            src="/logo.png"
            alt="AllZodiacs Logo"
            className="home-title-icon"
          />
          AllZodiacs
        </h1>
        <p className="home-subtitle">
          Explore tous les horoscopes à partir de ta naissance
        </p>
      </header>

      <main className="home-main">
        <DateInput onDateSubmit={handleDateSubmit} />
      </main>

      <footer className="home-footer">
        <p>AllZodiacs - Un moteur universel de correspondance astrologique</p>
      </footer>
    </div>
  );
}
