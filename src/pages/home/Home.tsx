import { useState } from "react";
import type { BirthDate, ZodiacSign } from "../../types/astrology";
import { calculateAllSigns } from "../../utils/astrologyCalculators";
import DateInput from "../../components/DateInput/DateInput";
import ResultsDisplay from "../../components/ResultsDisplay/ResultsDisplay";
import "./Home.css";

export default function Home() {
  const [signs, setSigns] = useState<Record<string, ZodiacSign>>({});
  const [birthDate, setBirthDate] = useState<BirthDate | null>(null);

  const handleDateSubmit = (date: BirthDate) => {
    setBirthDate(date);
    const calculatedSigns = calculateAllSigns(date);
    setSigns(calculatedSigns);
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

        {birthDate && Object.keys(signs).length > 0 && (
          <ResultsDisplay signs={signs} birthDate={birthDate} />
        )}
      </main>

      <footer className="home-footer">
        <p>AllZodiacs - Un moteur universel de correspondance astrologique</p>
        <p className="home-footer-note">
          Connecte les traditions anciennes aux technologies modernes
        </p>
      </footer>
    </div>
  );
}
