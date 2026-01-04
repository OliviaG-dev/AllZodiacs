import { useNavigate } from 'react-router-dom';
import type { ZodiacSign } from '../../types/astrology';
import './ResultsDisplay.css';

interface ResultsDisplayProps {
  signs: Record<string, ZodiacSign>;
  birthDate: { day: number; month: number; year: number };
}

export default function ResultsDisplay({ signs, birthDate }: ResultsDisplayProps) {
  const navigate = useNavigate();
  const formatDate = (day: number, month: number, year: number) => {
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const systemNames: Record<string, string> = {
    occidental: 'Occidental',
    chinois: 'Chinois',
    tibetain: 'Tibétain',
    kabbalistique: 'Kabbalistique',
    perse: 'Perse',
    maya: 'Maya',
    azteque: 'Aztèque',
    grec: 'Grec',
    amerindien: 'Amérindien',
    africain: 'Africain',
    egyptien: 'Égyptien',
    inuit: 'Inuit',
    vedique: 'Védique',
    alchimique: 'Alchimique',
    viking: 'Viking',
    celtique: 'Celtique',
  };

  return (
    <div className="results-display">
      <div className="results-header">
        <h2 className="results-title">Vos signes astrologiques</h2>
        <p className="results-date">
          Date de naissance : <strong>{formatDate(birthDate.day, birthDate.month, birthDate.year)}</strong>
        </p>
      </div>

      <div className="results-grid">
        {Object.entries(signs).map(([key, sign]) => (
          <div 
            key={key} 
            className={`sign-card sign-card-${key}`}
            onClick={() => navigate('/describe', {
              state: {
                systemKey: key,
                sign: sign,
                birthDate: birthDate
              }
            })}
          >
            <div className="sign-card-header">
              <span className={`sign-system sign-system-${key}`}>{systemNames[key] || sign.system}</span>
            </div>
            <div className="sign-card-body">
              <h3 className="sign-name">{sign.name}</h3>
              {sign.dateRange && (
                <p className="sign-date-range">{sign.dateRange}</p>
              )}
              <p className="sign-discover-text">(clique pour découvrir)</p>
            </div>
          </div>
        ))}
      </div>

      {Object.keys(signs).length === 0 && (
        <div className="results-empty">
          <p>Aucun signe calculé. Entrez votre date de naissance pour commencer.</p>
        </div>
      )}
    </div>
  );
}
