import { useLocation, useNavigate } from "react-router-dom";
import type { ZodiacSign, BirthDate } from "../../types/astrology";
import "./Describe.css";

interface LocationState {
  sign: ZodiacSign;
  birthDate: BirthDate;
}

export default function Describe() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  // Si pas de données, rediriger vers la home
  if (!state || !state.sign || !state.birthDate) {
    navigate("/");
    return null;
  }

  const { sign, birthDate } = state;

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (day: number, month: number, year: number) => {
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Mapper le nom du système à la clé CSS
  const getSystemKey = (systemName: string): string => {
    const systemMap: Record<string, string> = {
      Occidental: "occidental",
      Chinois: "chinois",
      Tibétain: "tibetain",
      Kabbalistique: "kabbalistique",
      Perse: "perse",
      Maya: "maya",
      Aztèque: "azteque",
      Druidique: "druidique",
      Amérindien: "amerindien",
      Africain: "africain",
      Égyptien: "egyptien",
      Inuit: "inuit",
      Védique: "vedique",
      Alchimique: "alchimique",
      Viking: "viking",
      Celtique: "celtique",
    };
    return systemMap[systemName] || "occidental";
  };

  const systemKey = getSystemKey(sign.system);

  return (
    <div className="describe-page">
      <main className="describe-page-main">
        <div className="describe-card">
          <h1 className="describe-title">{sign.name}</h1>
          <p className={`describe-system describe-system-${systemKey}`}>
            {sign.system}
          </p>
          {sign.dateRange && (
            <p className="describe-date-range">{sign.dateRange}</p>
          )}
          <p className="describe-birth-date">
            Date de naissance :{" "}
            <strong>
              {formatDate(birthDate.day, birthDate.month, birthDate.year)}
            </strong>
          </p>
          {sign.description && (
            <p className="describe-text">{sign.description}</p>
          )}
        </div>
      </main>

      <button onClick={handleBack} className="describe-back-button">
        Retour
      </button>
    </div>
  );
}
