import type { BirthDate, ZodiacSign } from "../types/astrology";
import { KABBALISTIC_ANGELS } from "../data/kabbalisticAngels";

/**
 * Utilitaires
 */
const birthDateToDate = (date: BirthDate): Date => {
  return new Date(date.year, date.month - 1, date.day);
};

const getDayOfYear = (date: BirthDate): number => {
  const jsDate = birthDateToDate(date);
  const start = new Date(jsDate.getFullYear(), 0, 0);
  const diff =
    jsDate.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - jsDate.getTimezoneOffset()) * 60000;
  return Math.floor(diff / 86400000);
};

/**
 * Calcule le signe astrologique occidental (zodiaque tropical)
 */
export function calculateWesternZodiac(date: BirthDate): ZodiacSign {
  const { day, month } = date;

  const signs = [
    { sign: "Capricorne", from: [12, 22] },
    { sign: "Verseau", from: [1, 20] },
    { sign: "Poissons", from: [2, 19] },
    { sign: "Bélier", from: [3, 21] },
    { sign: "Taureau", from: [4, 20] },
    { sign: "Gémeaux", from: [5, 21] },
    { sign: "Cancer", from: [6, 21] },
    { sign: "Lion", from: [7, 23] },
    { sign: "Vierge", from: [8, 23] },
    { sign: "Balance", from: [9, 23] },
    { sign: "Scorpion", from: [10, 23] },
    { sign: "Sagittaire", from: [11, 22] },
  ];

  for (let i = signs.length - 1; i >= 0; i--) {
    const [m, d] = signs[i].from;
    if (month > m || (month === m && day >= d)) {
      return { name: signs[i].sign, system: "Occidental" };
    }
  }

  return { name: "Capricorne", system: "Occidental" };
}

/**
 * Calcule la date approximative du Nouvel An chinois pour une année donnée
 * Le Nouvel An chinois tombe généralement entre le 21 janvier et le 20 février
 */
function getChineseNewYearDate(year: number): { month: number; day: number } {
  // Table des dates du Nouvel An chinois pour les années récentes (approximation)
  // Pour une précision absolue, il faudrait utiliser un calcul lunaire complexe
  const newYearDates: Record<number, { month: number; day: number }> = {
    1900: { month: 1, day: 31 },
    1901: { month: 2, day: 19 },
    1902: { month: 2, day: 8 },
    1903: { month: 1, day: 29 },
    1904: { month: 2, day: 16 },
    1905: { month: 2, day: 4 },
    1906: { month: 1, day: 25 },
    1907: { month: 2, day: 13 },
    1908: { month: 2, day: 2 },
    1909: { month: 1, day: 22 },
    1910: { month: 2, day: 10 },
    1911: { month: 1, day: 30 },
    1912: { month: 2, day: 18 },
    1913: { month: 2, day: 6 },
    1914: { month: 1, day: 26 },
    1915: { month: 2, day: 14 },
    1916: { month: 2, day: 3 },
    1917: { month: 1, day: 23 },
    1918: { month: 2, day: 11 },
    1919: { month: 2, day: 1 },
    1920: { month: 2, day: 20 },
    1921: { month: 2, day: 8 },
    1922: { month: 1, day: 28 },
    1923: { month: 2, day: 16 },
    1924: { month: 2, day: 5 },
    1925: { month: 1, day: 24 },
    1926: { month: 2, day: 13 },
    1927: { month: 2, day: 2 },
    1928: { month: 1, day: 23 },
    1929: { month: 2, day: 10 },
    1930: { month: 1, day: 30 },
    1931: { month: 2, day: 17 },
    1932: { month: 2, day: 6 },
    1933: { month: 1, day: 26 },
    1934: { month: 2, day: 14 },
    1935: { month: 2, day: 4 },
    1936: { month: 1, day: 24 },
    1937: { month: 2, day: 11 },
    1938: { month: 1, day: 31 },
    1939: { month: 2, day: 19 },
    1940: { month: 2, day: 8 },
    1941: { month: 1, day: 27 },
    1942: { month: 2, day: 15 },
    1943: { month: 2, day: 5 },
    1944: { month: 1, day: 25 },
    1945: { month: 2, day: 13 },
    1946: { month: 2, day: 2 },
    1947: { month: 1, day: 22 },
    1948: { month: 2, day: 10 },
    1949: { month: 1, day: 29 },
    1950: { month: 2, day: 17 },
    1951: { month: 2, day: 6 },
    1952: { month: 1, day: 27 },
    1953: { month: 2, day: 14 },
    1954: { month: 2, day: 3 },
    1955: { month: 1, day: 24 },
    1956: { month: 2, day: 12 },
    1957: { month: 1, day: 31 },
    1958: { month: 2, day: 18 },
    1959: { month: 2, day: 8 },
    1960: { month: 1, day: 28 },
    1961: { month: 2, day: 15 },
    1962: { month: 2, day: 5 },
    1963: { month: 1, day: 25 },
    1964: { month: 2, day: 13 },
    1965: { month: 2, day: 2 },
    1966: { month: 1, day: 21 },
    1967: { month: 2, day: 9 },
    1968: { month: 1, day: 30 },
    1969: { month: 2, day: 17 },
    1970: { month: 2, day: 6 },
    1971: { month: 1, day: 27 },
    1972: { month: 2, day: 15 },
    1973: { month: 2, day: 3 },
    1974: { month: 1, day: 23 },
    1975: { month: 2, day: 11 },
    1976: { month: 1, day: 31 },
    1977: { month: 2, day: 18 },
    1978: { month: 2, day: 7 },
    1979: { month: 1, day: 28 },
    1980: { month: 2, day: 16 },
    1981: { month: 2, day: 5 },
    1982: { month: 1, day: 25 },
    1983: { month: 2, day: 13 },
    1984: { month: 2, day: 2 },
    1985: { month: 2, day: 20 },
    1986: { month: 2, day: 9 },
    1987: { month: 1, day: 29 },
    1988: { month: 2, day: 17 },
    1989: { month: 2, day: 6 },
    1990: { month: 1, day: 27 },
    1991: { month: 2, day: 15 },
    1992: { month: 2, day: 4 },
    1993: { month: 1, day: 23 },
    1994: { month: 2, day: 10 },
    1995: { month: 1, day: 31 },
    1996: { month: 2, day: 19 },
    1997: { month: 2, day: 7 },
    1998: { month: 1, day: 28 },
    1999: { month: 2, day: 16 },
    2000: { month: 2, day: 5 },
    2001: { month: 1, day: 24 },
    2002: { month: 2, day: 12 },
    2003: { month: 2, day: 1 },
    2004: { month: 1, day: 22 },
    2005: { month: 2, day: 9 },
    2006: { month: 1, day: 29 },
    2007: { month: 2, day: 18 },
    2008: { month: 2, day: 7 },
    2009: { month: 1, day: 26 },
    2010: { month: 2, day: 14 },
    2011: { month: 2, day: 3 },
    2012: { month: 1, day: 23 },
    2013: { month: 2, day: 10 },
    2014: { month: 1, day: 31 },
    2015: { month: 2, day: 19 },
    2016: { month: 2, day: 8 },
    2017: { month: 1, day: 28 },
    2018: { month: 2, day: 16 },
    2019: { month: 2, day: 5 },
    2020: { month: 1, day: 25 },
    2021: { month: 2, day: 12 },
    2022: { month: 2, day: 1 },
    2023: { month: 1, day: 22 },
    2024: { month: 2, day: 10 },
    2025: { month: 1, day: 29 },
    2026: { month: 2, day: 17 },
    2027: { month: 2, day: 6 },
    2028: { month: 1, day: 26 },
    2029: { month: 2, day: 13 },
    2030: { month: 2, day: 3 },
  };

  // Si on a la date exacte, on l'utilise
  if (newYearDates[year]) {
    return newYearDates[year];
  }

  // Sinon, approximation : généralement entre le 21 janvier et le 20 février
  // On utilise une approximation basée sur le cycle de 19 ans (cycle métonique)
  // Pour simplifier, on utilise le 1er février comme approximation
  return { month: 2, day: 1 };
}

/**
 * Calcule le signe astrologique chinois avec son élément
 * L'année chinoise commence au Nouvel An chinois (entre le 21 janvier et le 20 février)
 */
export function calculateChineseZodiac(date: BirthDate): ZodiacSign {
  const animals = [
    "Rat",
    "Bœuf",
    "Tigre",
    "Lapin",
    "Dragon",
    "Serpent",
    "Cheval",
    "Chèvre",
    "Singe",
    "Coq",
    "Chien",
    "Cochon",
  ];

  // Déterminer l'année chinoise effective
  let chineseYear = date.year;
  const newYearDate = getChineseNewYearDate(date.year);

  // Si la date est avant le Nouvel An chinois, on utilise l'année précédente
  if (
    date.month < newYearDate.month ||
    (date.month === newYearDate.month && date.day < newYearDate.day)
  ) {
    chineseYear = date.year - 1;
  }

  const animal = animals[(chineseYear - 4) % 12];

  // Détermination de l'élément selon le dernier chiffre de l'année chinoise
  const lastDigit = chineseYear % 10;
  let element: string;

  if (lastDigit === 4 || lastDigit === 5) {
    element = "Bois";
  } else if (lastDigit === 6 || lastDigit === 7) {
    element = "Feu";
  } else if (lastDigit === 8 || lastDigit === 9) {
    element = "Terre";
  } else if (lastDigit === 0 || lastDigit === 1) {
    element = "Métal";
  } else {
    // lastDigit === 2 || lastDigit === 3
    element = "Eau";
  }

  return {
    name: `${animal} (${element})`,
    system: "Chinois",
    description: `${date.year}`,
  };
}

/**
 * Calcule le signe astrologique tibétain
 */
export function calculateTibetanZodiac(date: BirthDate): ZodiacSign {
  const animals = [
    "Lièvre",
    "Dragon",
    "Serpent",
    "Cheval",
    "Mouton",
    "Singe",
    "Oiseau",
    "Chien",
    "Cochon",
    "Souris",
    "Bœuf",
    "Tigre",
  ];
  return {
    name: animals[(date.year - 4) % 12],
    system: "Tibétain",
  };
}

/**
 * Calcule le signe astrologique kabbalistique (72 anges gardiens)
 */
export function calculateKabbalisticZodiac(date: BirthDate): ZodiacSign {
  const dayOfYear = getDayOfYear(date);
  const angelIndex = (dayOfYear - 1) % 72;
  const angel = KABBALISTIC_ANGELS[angelIndex];

  return {
    name: angel.name,
    system: "Kabbalistique",
    description: angel.hebrew,
  };
}

/**
 * Calcule le signe astrologique perse
 */
export function calculatePersianZodiac(date: BirthDate): ZodiacSign {
  const western = calculateWesternZodiac(date);

  const PERSE_SIGNS: Record<string, { name: string; fa: string }> = {
    Bélier: { name: "Hamal", fa: "حمل" },
    Taureau: { name: "Sawr", fa: "ثور" },
    Gémeaux: { name: "Jawzā", fa: "جوزا" },
    Cancer: { name: "Saratan", fa: "سرطان" },
    Lion: { name: "Asad", fa: "اسد" },
    Vierge: { name: "Sonbola", fa: "سنبله" },
    Balance: { name: "Mizān", fa: "میزان" },
    Scorpion: { name: "Aqrab", fa: "عقرب" },
    Sagittaire: { name: "Qaws", fa: "قوس" },
    Capricorne: { name: "Jadi", fa: "جدی" },
    Verseau: { name: "Dalw", fa: "دلو" },
    Poissons: { name: "Hūt", fa: "حوت" },
  };

  const perseSign = PERSE_SIGNS[western.name];
  if (perseSign) {
    return {
      name: perseSign.name,
      system: "Perse",
      description: perseSign.fa,
    };
  }

  return {
    name: western.name,
    system: "Perse",
  };
}

/**
 * Calcule le signe astrologique maya (Tzolkin)
 */
export function calculateMayanZodiac(date: BirthDate): ZodiacSign {
  const signs = [
    "Imix",
    "Ik",
    "Akbal",
    "Kan",
    "Chicchan",
    "Cimi",
    "Manik",
    "Lamat",
    "Muluc",
    "Oc",
    "Chuen",
    "Eb",
    "Ben",
    "Ix",
    "Men",
    "Cib",
    "Caban",
    "Etznab",
    "Cauac",
    "Ahau",
  ];
  return {
    name: signs[getDayOfYear(date) % 20],
    system: "Maya",
  };
}

/**
 * Calcule le signe astrologique aztèque (Tonalpohualli)
 */
export function calculateAztecZodiac(date: BirthDate): ZodiacSign {
  const signs = [
    "Crocodile",
    "Vent",
    "Maison",
    "Lézard",
    "Serpent",
    "Mort",
    "Cerf",
    "Lapin",
    "Eau",
    "Chien",
    "Singe",
    "Herbe",
    "Roseau",
    "Jaguar",
    "Aigle",
    "Vautour",
    "Mouvement",
    "Silex",
    "Pluie",
    "Fleur",
  ];
  return {
    name: signs[getDayOfYear(date) % 20],
    system: "Aztèque",
  };
}

/**
 * Calcule le signe astrologique druidique (21 arbres du calendrier druidique)
 * Système authentique basé sur le calendrier des arbres druidique
 */
export function calculateDruidicZodiac(date: BirthDate): ZodiacSign {
  const { day, month } = date;

  // Calendrier druidique complet avec 21 arbres
  // Certains arbres ont deux périodes dans l'année

  // Pommier (23 déc - 1 jan et 25 juin - 4 juil)
  if (
    (month === 12 && day >= 23) ||
    (month === 1 && day <= 1) ||
    (month === 6 && day >= 25) ||
    (month === 7 && day <= 4)
  ) {
    return { name: "Pommier", system: "Druidique" };
  }

  // Sapin (2-11 jan et 5-14 juil)
  if (
    (month === 1 && day >= 2 && day <= 11) ||
    (month === 7 && day >= 5 && day <= 14)
  ) {
    return { name: "Sapin", system: "Druidique" };
  }

  // Orme (12-24 jan et 15-25 juil)
  if (
    (month === 1 && day >= 12 && day <= 24) ||
    (month === 7 && day >= 15 && day <= 25)
  ) {
    return { name: "Orme", system: "Druidique" };
  }

  // Cyprès (25 jan - 3 fév et 26 juil - 4 août)
  if (
    (month === 1 && day >= 25) ||
    (month === 2 && day <= 3) ||
    (month === 7 && day >= 26) ||
    (month === 8 && day <= 4)
  ) {
    return { name: "Cyprès", system: "Druidique" };
  }

  // Peuplier (4-8 fév, 5-13 août, 1-14 mai)
  if (
    (month === 2 && day >= 4 && day <= 8) ||
    (month === 8 && day >= 5 && day <= 13) ||
    (month === 5 && day >= 1 && day <= 14)
  ) {
    return { name: "Peuplier", system: "Druidique" };
  }

  // Cèdre (9-18 fév et 14-23 août)
  if (
    (month === 2 && day >= 9 && day <= 18) ||
    (month === 8 && day >= 14 && day <= 23)
  ) {
    return { name: "Cèdre", system: "Druidique" };
  }

  // Pin (19-28 fév et 24 août - 2 sept)
  if (
    (month === 2 && day >= 19 && day <= 28) ||
    (month === 8 && day >= 24) ||
    (month === 9 && day <= 2)
  ) {
    return { name: "Pin", system: "Druidique" };
  }

  // Saule pleureur (1-10 mars et 3-12 sept)
  if (
    (month === 3 && day >= 1 && day <= 10) ||
    (month === 9 && day >= 3 && day <= 12)
  ) {
    return { name: "Saule pleureur", system: "Druidique" };
  }

  // Tilleul (11-20 mars et 13-22 sept)
  if (
    (month === 3 && day >= 11 && day <= 20) ||
    (month === 9 && day >= 13 && day <= 22)
  ) {
    return { name: "Tilleul", system: "Druidique" };
  }

  // Chêne (21 mars - équinoxe de printemps)
  if (month === 3 && day === 21) {
    return { name: "Chêne", system: "Druidique" };
  }

  // Noisetier (22-31 mars et 24 sept - 3 oct)
  if (
    (month === 3 && day >= 22 && day <= 31) ||
    (month === 9 && day >= 24) ||
    (month === 10 && day <= 3)
  ) {
    return { name: "Noisetier", system: "Druidique" };
  }

  // Sorbier (1-10 avr et 4-13 oct)
  if (
    (month === 4 && day >= 1 && day <= 10) ||
    (month === 10 && day >= 4 && day <= 13)
  ) {
    return { name: "Sorbier", system: "Druidique" };
  }

  // Érable (11-20 avr et 14-23 oct)
  if (
    (month === 4 && day >= 11 && day <= 20) ||
    (month === 10 && day >= 14 && day <= 23)
  ) {
    return { name: "Érable", system: "Druidique" };
  }

  // Noyer (21-30 avr et 24 oct - 2 nov)
  if (
    (month === 4 && day >= 21 && day <= 30) ||
    (month === 10 && day >= 24) ||
    (month === 11 && day <= 2)
  ) {
    return { name: "Noyer", system: "Druidique" };
  }

  // Châtaignier (15-24 mai et 12-21 nov)
  if (
    (month === 5 && day >= 15 && day <= 24) ||
    (month === 11 && day >= 12 && day <= 21)
  ) {
    return { name: "Châtaignier", system: "Druidique" };
  }

  // Frêne (25 mai - 3 juin et 22 nov - 1 déc)
  if (
    (month === 5 && day >= 25 && day <= 31) ||
    (month === 6 && day <= 3) ||
    (month === 11 && day >= 22) ||
    (month === 12 && day <= 1)
  ) {
    return { name: "Frêne", system: "Druidique" };
  }

  // Charme (4-13 juin et 2-11 déc)
  if (
    (month === 6 && day >= 4 && day <= 13) ||
    (month === 12 && day >= 2 && day <= 11)
  ) {
    return { name: "Charme", system: "Druidique" };
  }

  // Figuier (14-23 juin et 12-21 déc)
  if (
    (month === 6 && day >= 14 && day <= 23) ||
    (month === 12 && day >= 12 && day <= 21)
  ) {
    return { name: "Figuier", system: "Druidique" };
  }

  // Bouleau (24 juin - solstice d'été)
  if (month === 6 && day === 24) {
    return { name: "Bouleau", system: "Druidique" };
  }

  // Olivier (23 sept - équinoxe d'automne)
  if (month === 9 && day === 23) {
    return { name: "Olivier", system: "Druidique" };
  }

  // Par défaut (dates non couvertes par les arbres spéciaux)
  return { name: "Chêne", system: "Druidique" };
}

/**
 * Calcule le signe astrologique amérindien
 */
export function calculateNativeAmericanZodiac(date: BirthDate): ZodiacSign {
  const { month } = date;
  if (month <= 3) return { name: "Loutre", system: "Amérindien" };
  if (month <= 6) return { name: "Loup", system: "Amérindien" };
  if (month <= 9) return { name: "Saumon", system: "Amérindien" };
  return { name: "Serpent", system: "Amérindien" };
}

/**
 * Calcule le signe astrologique africain
 */
export function calculateAfricanZodiac(date: BirthDate): ZodiacSign {
  const signs = [
    "Baobab",
    "La Distance",
    "Le Marché",
    "La Famille",
    "L'Enfant de la Terre",
  ];
  return {
    name: signs[getDayOfYear(date) % signs.length],
    system: "Africain",
  };
}

/**
 * Calcule le signe astrologique égyptien
 */
export function calculateEgyptianZodiac(date: BirthDate): ZodiacSign {
  const { month } = date;
  if (month <= 2) return { name: "Anubis", system: "Égyptien" };
  if (month <= 4) return { name: "Isis", system: "Égyptien" };
  if (month <= 6) return { name: "Thot", system: "Égyptien" };
  if (month <= 8) return { name: "Sekhmet", system: "Égyptien" };
  if (month <= 10) return { name: "Serket", system: "Égyptien" };
  return { name: "Osiris", system: "Égyptien" };
}

/**
 * Calcule le signe astrologique inuit (12 animaux arctiques)
 */
export function calculateInuitZodiac(date: BirthDate): ZodiacSign {
  const { day, month } = date;

  // Polar Bear (22 déc - 19 jan)
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { name: "Ours Polaire", system: "Inuit" };
  }
  // Raven (20 jan - 18 fév)
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { name: "Corbeau", system: "Inuit" };
  }
  // Arctic Wolf (19 fév - 20 mars)
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return { name: "Loup Arctique", system: "Inuit" };
  }
  // Seal (21 mars - 19 avr)
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { name: "Phoque", system: "Inuit" };
  }
  // Caribou (20 avr - 20 mai)
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { name: "Caribou", system: "Inuit" };
  }
  // Snowy Owl (21 mai - 20 juin)
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { name: "Harfang des neiges", system: "Inuit" };
  }
  // Walrus (21 juin - 22 juil)
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { name: "Morse", system: "Inuit" };
  }
  // Salmon (23 juil - 22 août)
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { name: "Saumon", system: "Inuit" };
  }
  // Orca (23 août - 22 sept)
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { name: "Orque", system: "Inuit" };
  }
  // Snowy Owl (23 sept - 22 oct) - Note: il y a deux périodes pour Snowy Owl, je garde la première occurrence
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { name: "Harfang des neiges", system: "Inuit" };
  }
  // Beluga Whale (23 oct - 21 nov)
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { name: "Béluga", system: "Inuit" };
  }
  // Lone Wolf (22 nov - 21 déc)
  return { name: "Loup Solitaire", system: "Inuit" };
}

/**
 * Calcule le signe astrologique védique (Jyotish)
 */
export function calculateVedicZodiac(date: BirthDate): ZodiacSign {
  const { day, month } = date;

  const signs = [
    { sign: "Makara", from: [12, 22] },
    { sign: "Kumbha", from: [1, 20] },
    { sign: "Meena", from: [2, 19] },
    { sign: "Mesha", from: [3, 21] },
    { sign: "Vrishabha", from: [4, 20] },
    { sign: "Mithuna", from: [5, 21] },
    { sign: "Karka", from: [6, 21] },
    { sign: "Simha", from: [7, 23] },
    { sign: "Kanya", from: [8, 23] },
    { sign: "Tula", from: [9, 23] },
    { sign: "Vrishchika", from: [10, 23] },
    { sign: "Dhanu", from: [11, 22] },
  ];

  for (let i = signs.length - 1; i >= 0; i--) {
    const [m, d] = signs[i].from;
    if (month > m || (month === m && day >= d)) {
      return { name: signs[i].sign, system: "Védique" };
    }
  }

  return { name: "Makara", system: "Védique" };
}

/**
 * Calcule le signe astrologique alchimique (7 phases)
 */
export function calculateAlchemicalZodiac(date: BirthDate): ZodiacSign {
  const dayOfYear = getDayOfYear(date);
  const daysPerPhase = 365 / 7;

  if (dayOfYear <= Math.floor(daysPerPhase * 1)) {
    return {
      name: "Calcination",
      system: "Alchimique",
      description: "Nigredo",
    };
  }
  if (dayOfYear <= Math.floor(daysPerPhase * 2)) {
    return {
      name: "Dissolution",
      system: "Alchimique",
      description: "Nigredo",
    };
  }
  if (dayOfYear <= Math.floor(daysPerPhase * 3)) {
    return { name: "Séparation", system: "Alchimique", description: "Albedo" };
  }
  if (dayOfYear <= Math.floor(daysPerPhase * 4)) {
    return { name: "Conjonction", system: "Alchimique", description: "Albedo" };
  }
  if (dayOfYear <= Math.floor(daysPerPhase * 5)) {
    return {
      name: "Fermentation",
      system: "Alchimique",
      description: "Rubedo",
    };
  }
  if (dayOfYear <= Math.floor(daysPerPhase * 6)) {
    return {
      name: "Distillation",
      system: "Alchimique",
      description: "Rubedo",
    };
  }
  return { name: "Coagulation", system: "Alchimique", description: "Rubedo" };
}

/**
 * Calcule le signe astrologique viking (6 périodes mythiques)
 */
export function calculateVikingZodiac(date: BirthDate): ZodiacSign {
  const { month } = date;

  if (month <= 2) {
    return { name: "Bjorn (Ours)", system: "Viking" };
  }
  if (month <= 4) {
    return { name: "Jormungand", system: "Viking" };
  }
  if (month <= 6) {
    return { name: "Thor", system: "Viking" };
  }
  if (month <= 8) {
    return { name: "Fenrir", system: "Viking" };
  }
  if (month <= 10) {
    return { name: "Odin", system: "Viking" };
  }
  return { name: "Loki", system: "Viking" };
}

/**
 * Calcule le signe astrologique celtique (13 arbres sacrés)
 */
export function calculateCelticZodiac(date: BirthDate): ZodiacSign {
  const { day, month } = date;

  // Bouleau (24 déc - 20 jan)
  if ((month === 12 && day >= 24) || (month === 1 && day <= 20)) {
    return { name: "Bouleau", system: "Celtique" };
  }
  // Sorbier (21 jan - 17 fév)
  if ((month === 1 && day >= 21) || (month === 2 && day <= 17)) {
    return { name: "Sorbier", system: "Celtique" };
  }
  // Frêne (18 fév - 17 mars)
  if ((month === 2 && day >= 18) || (month === 3 && day <= 17)) {
    return { name: "Frêne", system: "Celtique" };
  }
  // Aulne (18 mars - 14 avr)
  if ((month === 3 && day >= 18) || (month === 4 && day <= 14)) {
    return { name: "Aulne", system: "Celtique" };
  }
  // Saule (15 avr - 12 mai)
  if ((month === 4 && day >= 15) || (month === 5 && day <= 12)) {
    return { name: "Saule", system: "Celtique" };
  }
  // Aubépine (13 mai - 9 juin)
  if ((month === 5 && day >= 13) || (month === 6 && day <= 9)) {
    return { name: "Aubépine", system: "Celtique" };
  }
  // Chêne (10 juin - 7 juil)
  if ((month === 6 && day >= 10) || (month === 7 && day <= 7)) {
    return { name: "Chêne", system: "Celtique" };
  }
  // Houx (8 juil - 4 août)
  if ((month === 7 && day >= 8) || (month === 8 && day <= 4)) {
    return { name: "Houx", system: "Celtique" };
  }
  // Noisetier (5 août - 1 sept)
  if ((month === 8 && day >= 5) || (month === 9 && day <= 1)) {
    return { name: "Noisetier", system: "Celtique" };
  }
  // Vigne (2 sept - 29 sept)
  if ((month === 9 && day >= 2) || (month === 9 && day <= 29)) {
    return { name: "Vigne", system: "Celtique" };
  }
  // Lierre (30 sept - 27 oct)
  if ((month === 9 && day >= 30) || (month === 10 && day <= 27)) {
    return { name: "Lierre", system: "Celtique" };
  }
  // Roseau (28 oct - 24 nov)
  if ((month === 10 && day >= 28) || (month === 11 && day <= 24)) {
    return { name: "Roseau", system: "Celtique" };
  }
  // Sureau (25 nov - 23 déc)
  return { name: "Sureau", system: "Celtique" };
}

/**
 * Calcule tous les signes astrologiques pour une date de naissance
 */
export function calculateAllSigns(date: BirthDate): Record<string, ZodiacSign> {
  return {
    occidental: calculateWesternZodiac(date),
    chinois: calculateChineseZodiac(date),
    tibetain: calculateTibetanZodiac(date),
    kabbalistique: calculateKabbalisticZodiac(date),
    perse: calculatePersianZodiac(date),
    maya: calculateMayanZodiac(date),
    azteque: calculateAztecZodiac(date),
    druidique: calculateDruidicZodiac(date),
    amerindien: calculateNativeAmericanZodiac(date),
    africain: calculateAfricanZodiac(date),
    egyptien: calculateEgyptianZodiac(date),
    inuit: calculateInuitZodiac(date),
    vedique: calculateVedicZodiac(date),
    alchimique: calculateAlchemicalZodiac(date),
    viking: calculateVikingZodiac(date),
    celtique: calculateCelticZodiac(date),
  };
}
