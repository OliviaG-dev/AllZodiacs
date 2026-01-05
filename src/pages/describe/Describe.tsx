import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { ZodiacSign, BirthDate } from "../../types/astrology";
import {
  getZodiacDescription,
  getZodiacKeywords,
  getZodiacSystemInfo,
  getAllZodiacSigns,
  type ZodiacSystemInfo,
  type ZodiacSignInfo,
} from "../../utils/zodiacDescriptions";
import "./Describe.css";

interface LocationState {
  sign: ZodiacSign;
  birthDate: BirthDate;
  systemKey?: string;
}

export default function Describe() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const [description, setDescription] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[] | null>(null);
  const [systemInfo, setSystemInfo] = useState<ZodiacSystemInfo | null>(null);
  const [allSigns, setAllSigns] = useState<ZodiacSignInfo[] | null>(null);

  // Mapper le nom du système à la clé CSS
  const getSystemKeyFromName = (systemName: string): string => {
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

  const sign = state?.sign;
  const birthDate = state?.birthDate;
  const systemKey = state?.systemKey;
  const cssSystemKey =
    systemKey || (sign ? getSystemKeyFromName(sign.system) : "occidental");

  useEffect(() => {
    if (!sign) return;

    const keyToUse = systemKey || getSystemKeyFromName(sign.system);

    if (keyToUse) {
      // Charger les informations du système astrologique
      const loadedSystemInfo = getZodiacSystemInfo(keyToUse);
      if (loadedSystemInfo) {
        setSystemInfo(loadedSystemInfo);
      }

      // Charger tous les signes disponibles
      const loadedAllSigns = getAllZodiacSigns(keyToUse);
      if (loadedAllSigns) {
        setAllSigns(loadedAllSigns);
      }

      // Charger la description depuis les JSON
      const loadedDescription = getZodiacDescription(keyToUse, sign.name);
      const loadedKeywords = getZodiacKeywords(keyToUse, sign.name);

      if (loadedDescription) {
        setDescription(loadedDescription);
      } else if (sign.description) {
        setDescription(sign.description);
      }

      if (loadedKeywords) {
        setKeywords(loadedKeywords);
      }
    } else if (sign.description) {
      setDescription(sign.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemKey, sign?.name, sign?.description, sign?.system]);

  // Si pas de données, rediriger vers la home
  if (!state || !sign || !birthDate) {
    navigate("/");
    return null;
  }

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

  return (
    <div className="describe-page">
      <main className="describe-page-main">
        <div className="describe-card">
          <h1 className="describe-title">{sign.name}</h1>
          <p className={`describe-system describe-system-${cssSystemKey}`}>
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

          {/* Section 1 : Résumé de l'horoscope (système astrologique) */}
          {systemInfo && (
            <section className="describe-system-section">
              <h2 className="describe-section-title">
                À propos de cet horoscope
              </h2>
              <div className="describe-system-info">
                {systemInfo.variant && (
                  <div
                    className={`describe-info-item describe-info-item-${cssSystemKey}`}
                  >
                    <span className="describe-info-label">Variant :</span>
                    <span className="describe-info-value">
                      {systemInfo.variant}
                    </span>
                  </div>
                )}
                {systemInfo.origin && (
                  <div
                    className={`describe-info-item describe-info-item-${cssSystemKey}`}
                  >
                    <span className="describe-info-label">Origine :</span>
                    <span className="describe-info-value">
                      {systemInfo.origin}
                    </span>
                  </div>
                )}
                {systemInfo.type && (
                  <div
                    className={`describe-info-item describe-info-item-${cssSystemKey}`}
                  >
                    <span className="describe-info-label">Type :</span>
                    <span className="describe-info-value">
                      {systemInfo.type}
                    </span>
                  </div>
                )}
                {systemInfo.calculation?.note && (
                  <div
                    className={`describe-info-item describe-info-item-${cssSystemKey}`}
                  >
                    <span className="describe-info-label">Calcul :</span>
                    <span className="describe-info-value">
                      {systemInfo.calculation.note}
                    </span>
                  </div>
                )}
                {systemInfo.meta?.cycleLength && (
                  <div
                    className={`describe-info-item describe-info-item-${cssSystemKey}`}
                  >
                    <span className="describe-info-label">Cycle :</span>
                    <span className="describe-info-value">
                      {systemInfo.meta.cycleLength} signes
                    </span>
                  </div>
                )}
              </div>

              {/* Liste de tous les signes disponibles */}
              {allSigns && allSigns.length > 0 && (
                <div className="describe-all-signs">
                  <h3 className="describe-all-signs-title">
                    Tous les signes ({allSigns.length})
                  </h3>
                  <div className="describe-all-signs-list">
                    {allSigns.map((signItem, index) => {
                      // Normaliser les noms pour la comparaison
                      const normalizeSignName = (name: string): string => {
                        const normalized = name
                          .toLowerCase()
                          .trim()
                          .replace(/[''`]/g, "") // Enlever les apostrophes (ex: "Ik'" -> "ik")
                          .replace(/\s+/g, " ")
                          .normalize("NFD") // Normaliser les accents
                          .replace(/[\u0300-\u036f]/g, ""); // Enlever les diacritiques

                        // Mapping spécifique pour les variations maya
                        const mayaMappings: Record<string, string> = {
                          muluc: "muluk",
                          muluk: "muluc",
                          oc: "ok",
                          ok: "oc",
                        };

                        return mayaMappings[normalized] || normalized;
                      };

                      // Extraire le contenu des parenthèses
                      const extractParentheses = (name: string): string[] => {
                        const matches = name.match(/\(([^)]+)\)/g);
                        if (!matches) return [];
                        return matches.map((m) =>
                          normalizeSignName(m.replace(/[()]/g, ""))
                        );
                      };

                      const normalizedItemName = normalizeSignName(
                        signItem.name
                      );
                      const normalizedSignName = normalizeSignName(sign.name);

                      // Extraire les mots des parenthèses pour les deux noms
                      const itemParentheses = extractParentheses(signItem.name);

                      // Comparer aussi avec l'ID si disponible (plus proche des noms calculés pour maya)
                      const normalizedItemId = signItem.id
                        ? normalizeSignName(signItem.id)
                        : null;

                      // Pour Aztèque : normaliser aussi le champ translation
                      const normalizedItemTranslation = signItem.translation
                        ? normalizeSignName(signItem.translation)
                        : null;

                      // Pour Viking : chercher dans les parenthèses du JSON
                      const cssSystemKeyForViking =
                        cssSystemKey === "viking" || sign?.system === "Viking";

                      // Pour Aztèque : vérifier si le nom calculé correspond à la translation
                      const cssSystemKeyForAztec =
                        cssSystemKey === "azteque" ||
                        sign?.system === "Aztèque";

                      // Mapping Viking pour la sélection
                      const getVikingMapping = (
                        name: string
                      ): string | null => {
                        if (!cssSystemKeyForViking) return null;
                        const firstWord = normalizeSignName(name)
                          .split(/\s+/)[0]
                          .replace(/\s*\([^)]*\)/g, "");
                        const vikingMap: Record<string, string> = {
                          bjorn: "création",
                          ours: "création",
                          jormungand: "ascension",
                          thor: "prospérité",
                          fenrir: "conflit",
                          odin: "déclin",
                          loki: "renaissance",
                        };
                        return vikingMap[firstWord] || null;
                      };

                      const vikingMappedName = getVikingMapping(sign.name);
                      const itemNameWithoutParens = normalizedItemName.replace(
                        /\s*\([^)]*\)/g,
                        ""
                      );

                      // Correspondance exacte ou partielle
                      let isActive =
                        normalizedItemName === normalizedSignName ||
                        normalizedItemName.startsWith(normalizedSignName) ||
                        normalizedSignName.startsWith(normalizedItemName) ||
                        (normalizedItemId !== null &&
                          (normalizedItemId === normalizedSignName ||
                            normalizedItemId.startsWith(normalizedSignName) ||
                            normalizedSignName.startsWith(normalizedItemId))) ||
                        // Pour Aztèque : vérifier aussi la translation
                        (cssSystemKeyForAztec &&
                          normalizedItemTranslation !== null &&
                          (normalizedItemTranslation === normalizedSignName ||
                            normalizedItemTranslation.startsWith(
                              normalizedSignName
                            ) ||
                            normalizedSignName.startsWith(
                              normalizedItemTranslation
                            )));

                      // Pour Viking : utiliser le mapping
                      if (
                        cssSystemKeyForViking &&
                        vikingMappedName &&
                        itemNameWithoutParens ===
                          normalizeSignName(vikingMappedName)
                      ) {
                        isActive = true;
                      }

                      // Vérifier aussi l'inverse : si le nom du JSON (sans parenthèses) correspond au nom calculé
                      const signNameWithoutParens = normalizedSignName.replace(
                        /\s*\([^)]*\)/g,
                        ""
                      );
                      if (
                        itemNameWithoutParens === signNameWithoutParens ||
                        itemNameWithoutParens.startsWith(
                          signNameWithoutParens
                        ) ||
                        signNameWithoutParens.startsWith(itemNameWithoutParens)
                      ) {
                        isActive = true;
                      }

                      // Pour Viking : vérifier si le nom calculé correspond au contenu des parenthèses du JSON
                      if (cssSystemKeyForViking) {
                        // Extraire le premier mot du nom calculé (ex: "bjorn" de "bjorn (ours)")
                        const signFirstWord = normalizedSignName
                          .split(/\s+/)[0]
                          .replace(/\s*\([^)]*\)/g, "");

                        // Vérifier si ce premier mot correspond au contenu des parenthèses du JSON
                        if (
                          itemParentheses.some((p) => {
                            const pWords = p.split(/\s+/);
                            return (
                              p === signFirstWord ||
                              pWords.includes(signFirstWord) ||
                              signFirstWord === p
                            );
                          })
                        ) {
                          isActive = true;
                        }
                      }

                      return (
                        <span
                          key={signItem.id || index}
                          className={`describe-sign-item ${
                            isActive
                              ? `describe-sign-item-active describe-sign-item-active-${cssSystemKey}`
                              : ""
                          }`}
                        >
                          {signItem.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Section 2 : Description du signe obtenu */}
          <section className="describe-sign-section">
            <h2 className="describe-section-title">
              Votre signe : {sign.name}
            </h2>

            {keywords && keywords.length > 0 && (
              <div className="describe-keywords">
                <p className="describe-keywords-label">Mots-clés :</p>
                <div className="describe-keywords-list">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className={`describe-keyword describe-keyword-${cssSystemKey}`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {description && (
              <div className="describe-description">
                <p className="describe-text">{description}</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <button onClick={handleBack} className="describe-back-button">
        Retour
      </button>
    </div>
  );
}
