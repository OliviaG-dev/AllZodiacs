import { useLocation, useNavigate } from "react-router-dom";
import type { BirthDate, ZodiacSign } from "../../types/astrology";
import ResultsDisplay from "../../components/ResultsDisplay/ResultsDisplay";
import "./Results.css";

interface LocationState {
  signs: Record<string, ZodiacSign>;
  birthDate: BirthDate;
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  // Si pas de données, rediriger vers la home
  if (!state || !state.signs || !state.birthDate) {
    navigate("/");
    return null;
  }

  const { signs, birthDate } = state;

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="results-page">
      <main className="results-page-main">
        <ResultsDisplay signs={signs} birthDate={birthDate} />
      </main>

      <button onClick={handleBack} className="results-back-button">
        ← Retour
      </button>
    </div>
  );
}
