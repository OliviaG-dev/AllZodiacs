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
 * Calcule le signe astrologique chinois
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
  const sign = animals[(date.year - 4) % 12];
  return {
    name: sign,
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
 * Calcule le signe astrologique druidique
 */
export function calculateDruidicZodiac(date: BirthDate): ZodiacSign {
  const { month } = date;
  if (month <= 3) return { name: "Bouleau", system: "Druidique" };
  if (month <= 6) return { name: "Chêne", system: "Druidique" };
  if (month <= 9) return { name: "Noisetier", system: "Druidique" };
  return { name: "Noyer", system: "Druidique" };
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
 * Calcule le signe astrologique arabe
 */
export function calculateArabicZodiac(date: BirthDate): ZodiacSign {
  return calculateWesternZodiac(date);
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
    arabe: calculateArabicZodiac(date),
    vedique: calculateVedicZodiac(date),
    alchimique: calculateAlchemicalZodiac(date),
    viking: calculateVikingZodiac(date),
    celtique: calculateCelticZodiac(date),
  };
}
