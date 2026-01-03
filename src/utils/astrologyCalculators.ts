import type { BirthDate, ZodiacSign } from '../types/astrology';

/**
 * Calcule le signe astrologique occidental (zodiaque tropical)
 */
export function calculateWesternZodiac(date: BirthDate): ZodiacSign {
  const { day, month } = date;
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { name: 'Bélier', system: 'Occidental', dateRange: '21 mars - 19 avril' };
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { name: 'Taureau', system: 'Occidental', dateRange: '20 avril - 20 mai' };
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { name: 'Gémeaux', system: 'Occidental', dateRange: '21 mai - 20 juin' };
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { name: 'Cancer', system: 'Occidental', dateRange: '21 juin - 22 juillet' };
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { name: 'Lion', system: 'Occidental', dateRange: '23 juillet - 22 août' };
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { name: 'Vierge', system: 'Occidental', dateRange: '23 août - 22 septembre' };
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { name: 'Balance', system: 'Occidental', dateRange: '23 septembre - 22 octobre' };
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { name: 'Scorpion', system: 'Occidental', dateRange: '23 octobre - 21 novembre' };
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { name: 'Sagittaire', system: 'Occidental', dateRange: '22 novembre - 21 décembre' };
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { name: 'Capricorne', system: 'Occidental', dateRange: '22 décembre - 19 janvier' };
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { name: 'Verseau', system: 'Occidental', dateRange: '20 janvier - 18 février' };
  }
  // Poissons
  return { name: 'Poissons', system: 'Occidental', dateRange: '19 février - 20 mars' };
}

/**
 * Calcule le signe astrologique chinois
 */
export function calculateChineseZodiac(date: BirthDate): ZodiacSign {
  const { year } = date;
  const chineseSigns = [
    'Singe', 'Coq', 'Chien', 'Cochon', 'Rat', 'Bœuf',
    'Tigre', 'Lapin', 'Dragon', 'Serpent', 'Cheval', 'Chèvre'
  ];
  
  // Le zodiaque chinois commence en 1900 (année du Rat)
  const index = (year - 1900) % 12;
  const signName = chineseSigns[index];
  
  return { 
    name: signName, 
    system: 'Chinois',
    description: `Année ${year} - ${signName}`
  };
}

/**
 * Calcule le signe astrologique égyptien
 */
export function calculateEgyptianZodiac(date: BirthDate): ZodiacSign {
  const { day, month } = date;
  
  if ((month === 1 && day >= 1) || (month === 1 && day <= 7)) {
    return { name: 'Bastet', system: 'Égyptien', dateRange: '1-7 janvier' };
  }
  if ((month === 1 && day >= 8) || (month === 1 && day <= 21)) {
    return { name: 'Sekhmet', system: 'Égyptien', dateRange: '8-21 janvier' };
  }
  if ((month === 1 && day >= 22) || (month === 2 && day <= 1)) {
    return { name: 'Geb', system: 'Égyptien', dateRange: '22 janvier - 1 février' };
  }
  if ((month === 2 && day >= 2) || (month === 2 && day <= 15)) {
    return { name: 'Isis', system: 'Égyptien', dateRange: '2-15 février' };
  }
  if ((month === 2 && day >= 16) || (month === 2 && day <= 29)) {
    return { name: 'Thot', system: 'Égyptien', dateRange: '16-29 février' };
  }
  if ((month === 3 && day >= 1) || (month === 3 && day <= 10)) {
    return { name: 'Horus', system: 'Égyptien', dateRange: '1-10 mars' };
  }
  if ((month === 3 && day >= 11) || (month === 3 && day <= 31)) {
    return { name: 'Anubis', system: 'Égyptien', dateRange: '11-31 mars' };
  }
  if ((month === 4 && day >= 1) || (month === 4 && day <= 19)) {
    return { name: 'Seth', system: 'Égyptien', dateRange: '1-19 avril' };
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 8)) {
    return { name: 'Ptah', system: 'Égyptien', dateRange: '20 avril - 8 mai' };
  }
  if ((month === 5 && day >= 9) || (month === 5 && day <= 27)) {
    return { name: 'Atoum', system: 'Égyptien', dateRange: '9-27 mai' };
  }
  if ((month === 5 && day >= 28) || (month === 6 && day <= 18)) {
    return { name: 'Bes', system: 'Égyptien', dateRange: '28 mai - 18 juin' };
  }
  if ((month === 6 && day >= 19) || (month === 7 && day <= 28)) {
    return { name: 'Sekhmet', system: 'Égyptien', dateRange: '19 juin - 28 juillet' };
  }
  if ((month === 7 && day >= 29) || (month === 8 && day <= 11)) {
    return { name: 'Néfertoum', system: 'Égyptien', dateRange: '29 juillet - 11 août' };
  }
  if ((month === 8 && day >= 12) || (month === 8 && day <= 29)) {
    return { name: 'Rê', system: 'Égyptien', dateRange: '12-29 août' };
  }
  if ((month === 8 && day >= 30) || (month === 9 && day <= 17)) {
    return { name: 'Osiris', system: 'Égyptien', dateRange: '30 août - 17 septembre' };
  }
  if ((month === 9 && day >= 18) || (month === 10 && day <= 2)) {
    return { name: 'Maât', system: 'Égyptien', dateRange: '18 septembre - 2 octobre' };
  }
  if ((month === 10 && day >= 3) || (month === 10 && day <= 22)) {
    return { name: 'Hathor', system: 'Égyptien', dateRange: '3-22 octobre' };
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 11)) {
    return { name: 'Nout', system: 'Égyptien', dateRange: '23 octobre - 11 novembre' };
  }
  if ((month === 11 && day >= 12) || (month === 11 && day <= 29)) {
    return { name: 'Hapi', system: 'Égyptien', dateRange: '12-29 novembre' };
  }
  // Décembre
  return { name: 'Amon-Rê', system: 'Égyptien', dateRange: '1-31 décembre' };
}

/**
 * Calcule tous les signes astrologiques pour une date de naissance
 */
export function calculateAllSigns(date: BirthDate): Record<string, ZodiacSign> {
  return {
    occidental: calculateWesternZodiac(date),
    chinois: calculateChineseZodiac(date),
    egyptien: calculateEgyptianZodiac(date),
    // TODO: Ajouter d'autres systèmes (maya, druidique, arabe, aztèque, etc.)
  };
}
