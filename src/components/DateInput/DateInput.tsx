import { useState } from "react";
import type { BirthDate } from "../../types/astrology";
import "./DateInput.css";

interface DateInputProps {
  onDateSubmit: (date: BirthDate) => void;
}

export default function DateInput({ onDateSubmit }: DateInputProps) {
  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(2000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1900 ||
      year > 2100
    ) {
      alert("Veuillez entrer une date valide");
      return;
    }

    onDateSubmit({ day, month, year });
  };

  return (
    <form className="date-input-form" onSubmit={handleSubmit}>
      <div className="date-input-container">
        <h2 className="date-input-title">Entrez votre date de naissance</h2>
        <p className="date-input-subtitle">
          Découvrez tous vos signes astrologiques
        </p>

        <div className="date-input-fields">
          <div className="date-input-field">
            <label htmlFor="day">Jour</label>
            <input
              id="day"
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(parseInt(e.target.value) || 1)}
              required
            />
          </div>

          <div className="date-input-field">
            <label htmlFor="month">Mois</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              required
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {new Date(2000, m - 1, 1).toLocaleDateString("fr-FR", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>

          <div className="date-input-field">
            <label htmlFor="year">Année</label>
            <input
              id="year"
              type="number"
              min="1900"
              max="2100"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value) || 2000)}
              required
            />
          </div>

          <div className="date-input-button-wrapper">
            <button type="submit" className="date-input-button">
              Révéler mes signes astrologiques
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
