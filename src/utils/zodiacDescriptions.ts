import occidentalData from "../data/occidental/occidental.json";
import chinoisData from "../data/chinois/chinois.json";
import mayaData from "../data/maya/maya.json";
import perseData from "../data/perse/perse.json";
import kabbalistiqueData from "../data/kabbalistique/kabbalistique.json";
import africainData from "../data/Africain/Africain.json";
import tibetainData from "../data/Tibétain/Tibétain.json";
import aztequeData from "../data/azteque/azteque.json";
import alchimiqueData from "../data/alchimique/alchimique.json";
import amerindienData from "../data/Amérindien/Amérindien.json";
import celtiqueData from "../data/celtique/celtique.json";
import vikingData from "../data/Viking/Viking.json";
import egyptienData from "../data/egyptien/egyptien.json";
import inuitData from "../data/Inuit/inuit.json";
import vediqueData from "../data/Védique/Védique.json";
import druidiqueData from "../data/Druidique/Druidique.json";

// Imports des fichiers de signes détaillés
import occidentalSignesData from "../data/occidental/occidental-signes.json";
import chinoisSignesData from "../data/chinois/chinois-signes.json";
import mayaSignesData from "../data/maya/maya-signes.json";
import perseSignesData from "../data/perse/perse-signes.json";
import kabbalistiqueSignesData from "../data/kabbalistique/kabbalistique-signes.json";
import africainSignesData from "../data/Africain/Africain-signes.json";
import tibetainSignesData from "../data/Tibétain/Tibétain-signes.json";
import aztequeSignesData from "../data/azteque/azteque-signes.json";
import alchimiqueSignesData from "../data/alchimique/alchimique-signes.json";
import amerindienSignesData from "../data/Amérindien/Améradien-signes.json";
import celtiqueSignesData from "../data/celtique/celtique-signes.json";
import vikingSignesData from "../data/Viking/Viking-signes.json";
import egyptienSignesData from "../data/egyptien/egyptien-signes.json";
import inuitSignesData from "../data/Inuit/inuit-signes.json";
import vediqueSignesData from "../data/Védique/Védique-signes.json";
import druidiqueSignesData from "../data/Druidique/Druidique-signes.json";

type ZodiacData = {
  id: string;
  name: string;
  variant?: string;
  origin?: string;
  type?: string;
  calculation?: {
    basedOn?: string[];
    rule?: string;
    note?: string;
  };
  meta?: {
    cycleLength?: number;
    segmentLength?: number;
    startReference?: string;
  };
  signs: Array<{
    id?: string;
    name: string;
    description?: string;
    keywords?: string[];
    translation?: string;
    norseName?: string;
    period?: {
      from: { day: number; month: number };
      to: { day: number; month: number };
    };
  }>;
};

export type ZodiacSystemInfo = {
  name: string;
  variant?: string;
  origin?: string;
  type?: string;
  calculation?: {
    basedOn?: string[];
    rule?: string;
    note?: string;
  };
  meta?: {
    cycleLength?: number;
    segmentLength?: number;
    startReference?: string;
  };
};

export type ZodiacSignInfo = {
  id?: string;
  name: string;
  symbol?: string;
  description?: string;
  keywords?: string[];
  translation?: string;
  norseName?: string;
  period?: {
    from: { day: number; month: number };
    to: { day: number; month: number };
  };
};

export type ZodiacSignDetails = {
  id?: string;
  name: string;
  dates?: {
    start: string;
    end: string;
  };
  element?: string;
  planet?: string | null;
  symbol?: string;
  traits?: {
    positive?: string[];
    negative?: string[];
  };
  description?: string;
  compatibility?: string[];
  advice?: {
    daily?: string;
    love?: string;
    work?: string;
    health?: string;
  };
  colors?: string[];
  stones?: string[];
  keywords?: string[];
};

/**
 * Trouve la description d'un signe astrologique dans les données JSON
 */
export function getZodiacDescription(
  systemKey: string,
  signName: string
): string | null {
  let data: ZodiacData | undefined;

  // Charger les données selon le système
  switch (systemKey) {
    case "occidental":
      data = occidentalData[0] as ZodiacData;
      break;
    case "chinois":
      data = chinoisData[0] as ZodiacData;
      break;
    case "maya":
      data = mayaData[0] as ZodiacData;
      break;
    case "perse":
      data = perseData[0] as ZodiacData;
      break;
    case "kabbalistique":
      data = kabbalistiqueData[0] as ZodiacData;
      break;
    case "africain":
      data = africainData[0] as ZodiacData;
      break;
    case "tibetain":
      data = tibetainData[0] as ZodiacData;
      break;
    case "azteque":
      data = aztequeData[0] as ZodiacData;
      break;
    case "alchimique":
      data = alchimiqueData[0] as ZodiacData;
      break;
    case "amerindien":
      data = amerindienData[0] as ZodiacData;
      break;
    case "celtique":
      data = celtiqueData[0] as ZodiacData;
      break;
    case "viking":
      data = vikingData[0] as ZodiacData;
      break;
    case "egyptien":
      data = egyptienData[0] as ZodiacData;
      break;
    case "inuit":
      data = inuitData[0] as ZodiacData;
      break;
    case "vedique":
      data = vediqueData[0] as ZodiacData;
      break;
    case "druidique":
      data = druidiqueData[0] as ZodiacData;
      break;
    default:
      return null;
  }

  if (!data || !data.signs) {
    return null;
  }

  // Normaliser le nom du signe
  const normalizeName = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s*\([^)]*\)/g, "") // Enlever les éléments entre parenthèses
      .replace(/[''`]/g, "") // Enlever les apostrophes
      .replace(/\s+/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Enlever les diacritiques
  };

  const normalizedSignName = normalizeName(signName);

  // Mappings spécifiques pour certains systèmes
  const getSystemMapping = (key: string, signName: string): string | null => {
    const normalized = normalizeName(signName);

    // Mapping Alchimique : noms calculés -> noms dans JSON
    if (key === "alchimique") {
      const alchemicalMap: Record<string, string> = {
        calcination: "Nigredo",
        dissolution: "Nigredo",
        separation: "Albedo",
        séparation: "Albedo",
        conjonction: "Albedo",
        fermentation: "Rubedo",
        distillation: "Rubedo",
        coagulation: "Coagulatio",
      };
      return alchemicalMap[normalized] || null;
    }

    // Mapping Viking : noms calculés -> noms dans JSON
    if (key === "viking") {
      // Extraire le premier mot (pour gérer "bjorn ours" -> "bjorn")
      const firstWord = normalized.split(/\s+/)[0];

      const vikingMap: Record<string, string> = {
        bjorn: "Création (Bjorn)",
        ours: "Création (Bjorn)",
        "bjorn ours": "Création (Bjorn)",
        "bjorn (ours)": "Création (Bjorn)",
        jormungand: "Ascension (Jormungand)",
        thor: "Prospérité (Thor)",
        fenrir: "Conflit (Fenrir)",
        odin: "Déclin (Odin)",
        loki: "Renaissance (Loki)",
        ragnarök: "Renaissance (Loki)",
      };

      // Chercher d'abord avec le nom complet, puis avec le premier mot
      return vikingMap[normalized] || vikingMap[firstWord] || null;
    }

    return null;
  };

  // Chercher le signe
  const mappedName = getSystemMapping(systemKey, signName);

  const sign = data.signs.find((s) => {
    const normalizedDataName = normalizeName(s.name);

    // Correspondance exacte
    if (normalizedDataName === normalizedSignName) {
      return true;
    }

    // Vérifier les noms mappés
    if (mappedName && normalizedDataName === normalizeName(mappedName)) {
      return true;
    }

    // Pour Aztèque : chercher aussi dans le champ "translation"
    if (systemKey === "azteque" && s.translation) {
      const normalizedTranslation = normalizeName(s.translation);
      if (normalizedTranslation === normalizedSignName) {
        return true;
      }
    }

    // Pour Viking : chercher aussi dans le champ "norseName"
    if (systemKey === "viking" && s.norseName) {
      const normalizedNorseName = normalizeName(s.norseName);
      if (normalizedNorseName === normalizedSignName) {
        return true;
      }
    }

    // Pour Druidique et Celtique : correspondance plus flexible pour les noms d'arbres
    if (systemKey === "druidique" || systemKey === "celtique") {
      // Correspondance exacte des mots (sans tenir compte de l'ordre)
      const signWords = normalizedSignName.split(/\s+/).sort().join(" ");
      const dataWords = normalizedDataName.split(/\s+/).sort().join(" ");
      if (signWords === dataWords) {
        return true;
      }
    }

    // Correspondance partielle (pour gérer les noms composés)
    if (
      normalizedSignName.startsWith(normalizedDataName) ||
      normalizedDataName.startsWith(normalizedSignName) ||
      normalizedSignName.includes(normalizedDataName) ||
      normalizedDataName.includes(normalizedSignName)
    ) {
      return true;
    }

    return false;
  });

  return sign?.description || null;
}

/**
 * Trouve les mots-clés d'un signe astrologique
 */
export function getZodiacKeywords(
  systemKey: string,
  signName: string
): string[] | null {
  let data: ZodiacData | undefined;

  switch (systemKey) {
    case "occidental":
      data = occidentalData[0] as ZodiacData;
      break;
    case "chinois":
      data = chinoisData[0] as ZodiacData;
      break;
    case "maya":
      data = mayaData[0] as ZodiacData;
      break;
    case "perse":
      data = perseData[0] as ZodiacData;
      break;
    case "kabbalistique":
      data = kabbalistiqueData[0] as ZodiacData;
      break;
    case "africain":
      data = africainData[0] as ZodiacData;
      break;
    case "tibetain":
      data = tibetainData[0] as ZodiacData;
      break;
    case "azteque":
      data = aztequeData[0] as ZodiacData;
      break;
    case "alchimique":
      data = alchimiqueData[0] as ZodiacData;
      break;
    case "amerindien":
      data = amerindienData[0] as ZodiacData;
      break;
    case "celtique":
      data = celtiqueData[0] as ZodiacData;
      break;
    case "viking":
      data = vikingData[0] as ZodiacData;
      break;
    case "egyptien":
      data = egyptienData[0] as ZodiacData;
      break;
    case "inuit":
      data = inuitData[0] as ZodiacData;
      break;
    case "vedique":
      data = vediqueData[0] as ZodiacData;
      break;
    case "druidique":
      data = druidiqueData[0] as ZodiacData;
      break;
    default:
      return null;
  }

  if (!data || !data.signs) {
    return null;
  }

  // Normaliser le nom du signe
  const normalizeName = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s*\([^)]*\)/g, "") // Enlever les éléments entre parenthèses
      .replace(/[''`]/g, "") // Enlever les apostrophes
      .replace(/\s+/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Enlever les diacritiques
  };

  const normalizedSignName = normalizeName(signName);

  // Mappings spécifiques pour certains systèmes
  const getSystemMapping = (key: string, signName: string): string | null => {
    const normalized = normalizeName(signName);

    // Mapping Alchimique : noms calculés -> noms dans JSON
    if (key === "alchimique") {
      const alchemicalMap: Record<string, string> = {
        calcination: "Nigredo",
        dissolution: "Nigredo",
        separation: "Albedo",
        séparation: "Albedo",
        conjonction: "Albedo",
        fermentation: "Rubedo",
        distillation: "Rubedo",
        coagulation: "Coagulatio",
      };
      return alchemicalMap[normalized] || null;
    }

    // Mapping Viking : noms calculés -> noms dans JSON
    if (key === "viking") {
      // Extraire le premier mot (pour gérer "bjorn ours" -> "bjorn")
      const firstWord = normalized.split(/\s+/)[0];

      const vikingMap: Record<string, string> = {
        bjorn: "Création (Bjorn)",
        ours: "Création (Bjorn)",
        "bjorn ours": "Création (Bjorn)",
        "bjorn (ours)": "Création (Bjorn)",
        jormungand: "Ascension (Jormungand)",
        thor: "Prospérité (Thor)",
        fenrir: "Conflit (Fenrir)",
        odin: "Déclin (Odin)",
        loki: "Renaissance (Loki)",
        ragnarök: "Renaissance (Loki)",
      };

      // Chercher d'abord avec le nom complet, puis avec le premier mot
      return vikingMap[normalized] || vikingMap[firstWord] || null;
    }

    return null;
  };

  // Chercher le signe
  const mappedName = getSystemMapping(systemKey, signName);

  const sign = data.signs.find((s) => {
    const normalizedDataName = normalizeName(s.name);

    // Correspondance exacte
    if (normalizedDataName === normalizedSignName) {
      return true;
    }

    // Vérifier les noms mappés
    if (mappedName && normalizedDataName === normalizeName(mappedName)) {
      return true;
    }

    // Pour Aztèque : chercher aussi dans le champ "translation"
    if (systemKey === "azteque" && s.translation) {
      const normalizedTranslation = normalizeName(s.translation);
      if (normalizedTranslation === normalizedSignName) {
        return true;
      }
    }

    // Pour Viking : chercher aussi dans le champ "norseName"
    if (systemKey === "viking" && s.norseName) {
      const normalizedNorseName = normalizeName(s.norseName);
      if (normalizedNorseName === normalizedSignName) {
        return true;
      }
    }

    // Pour Druidique et Celtique : correspondance plus flexible pour les noms d'arbres
    if (systemKey === "druidique" || systemKey === "celtique") {
      // Correspondance exacte des mots (sans tenir compte de l'ordre)
      const signWords = normalizedSignName.split(/\s+/).sort().join(" ");
      const dataWords = normalizedDataName.split(/\s+/).sort().join(" ");
      if (signWords === dataWords) {
        return true;
      }
    }

    // Correspondance partielle (pour gérer les noms composés)
    if (
      normalizedSignName.startsWith(normalizedDataName) ||
      normalizedDataName.startsWith(normalizedSignName) ||
      normalizedSignName.includes(normalizedDataName) ||
      normalizedDataName.includes(normalizedSignName)
    ) {
      return true;
    }

    return false;
  });

  return sign?.keywords || null;
}

/**
 * Charge les informations sur le système astrologique
 */
export function getZodiacSystemInfo(
  systemKey: string
): ZodiacSystemInfo | null {
  let data: ZodiacData | undefined;

  switch (systemKey) {
    case "occidental":
      data = occidentalData[0] as ZodiacData;
      break;
    case "chinois":
      data = chinoisData[0] as ZodiacData;
      break;
    case "maya":
      data = mayaData[0] as ZodiacData;
      break;
    case "perse":
      data = perseData[0] as ZodiacData;
      break;
    case "kabbalistique":
      data = kabbalistiqueData[0] as ZodiacData;
      break;
    case "africain":
      data = africainData[0] as ZodiacData;
      break;
    case "tibetain":
      data = tibetainData[0] as ZodiacData;
      break;
    case "azteque":
      data = aztequeData[0] as ZodiacData;
      break;
    case "alchimique":
      data = alchimiqueData[0] as ZodiacData;
      break;
    case "amerindien":
      data = amerindienData[0] as ZodiacData;
      break;
    case "celtique":
      data = celtiqueData[0] as ZodiacData;
      break;
    case "viking":
      data = vikingData[0] as ZodiacData;
      break;
    case "egyptien":
      data = egyptienData[0] as ZodiacData;
      break;
    case "inuit":
      data = inuitData[0] as ZodiacData;
      break;
    case "vedique":
      data = vediqueData[0] as ZodiacData;
      break;
    case "druidique":
      data = druidiqueData[0] as ZodiacData;
      break;
    default:
      return null;
  }

  if (!data) {
    return null;
  }

  return {
    name: data.name,
    variant: data.variant,
    origin: data.origin,
    type: data.type,
    calculation: data.calculation,
    meta: data.meta,
  };
}

/**
 * Charge tous les signes disponibles pour un système astrologique
 */
export function getAllZodiacSigns(systemKey: string): ZodiacSignInfo[] | null {
  let data: ZodiacData | undefined;

  switch (systemKey) {
    case "occidental":
      data = occidentalData[0] as ZodiacData;
      break;
    case "chinois":
      data = chinoisData[0] as ZodiacData;
      break;
    case "maya":
      data = mayaData[0] as ZodiacData;
      break;
    case "perse":
      data = perseData[0] as ZodiacData;
      break;
    case "kabbalistique":
      data = kabbalistiqueData[0] as ZodiacData;
      break;
    case "africain":
      data = africainData[0] as ZodiacData;
      break;
    case "tibetain":
      data = tibetainData[0] as ZodiacData;
      break;
    case "azteque":
      data = aztequeData[0] as ZodiacData;
      break;
    case "alchimique":
      data = alchimiqueData[0] as ZodiacData;
      break;
    case "amerindien":
      data = amerindienData[0] as ZodiacData;
      break;
    case "celtique":
      data = celtiqueData[0] as ZodiacData;
      break;
    case "viking":
      data = vikingData[0] as ZodiacData;
      break;
    case "egyptien":
      data = egyptienData[0] as ZodiacData;
      break;
    case "inuit":
      data = inuitData[0] as ZodiacData;
      break;
    case "vedique":
      data = vediqueData[0] as ZodiacData;
      break;
    case "druidique":
      data = druidiqueData[0] as ZodiacData;
      break;
    default:
      return null;
  }

  if (!data || !data.signs) {
    return null;
  }

  return data.signs.map((sign) => ({
    id: sign.id,
    name: sign.name,
    description: sign.description,
    keywords: sign.keywords,
    translation: sign.translation,
    norseName: sign.norseName,
    period: sign.period,
  }));
}

/**
 * Récupère et formate les dates d'un signe astrologique
 */
export function getZodiacDateRange(
  systemKey: string,
  signName: string
): string | null {
  let data: ZodiacData | undefined;

  // Charger les données selon le système
  switch (systemKey) {
    case "occidental":
      data = occidentalData[0] as ZodiacData;
      break;
    case "chinois":
      data = chinoisData[0] as ZodiacData;
      break;
    case "maya":
      data = mayaData[0] as ZodiacData;
      break;
    case "perse":
      data = perseData[0] as ZodiacData;
      break;
    case "kabbalistique":
      data = kabbalistiqueData[0] as ZodiacData;
      break;
    case "africain":
      data = africainData[0] as ZodiacData;
      break;
    case "tibetain":
      data = tibetainData[0] as ZodiacData;
      break;
    case "azteque":
      data = aztequeData[0] as ZodiacData;
      break;
    case "alchimique":
      data = alchimiqueData[0] as ZodiacData;
      break;
    case "amerindien":
      data = amerindienData[0] as ZodiacData;
      break;
    case "celtique":
      data = celtiqueData[0] as ZodiacData;
      break;
    case "viking":
      data = vikingData[0] as ZodiacData;
      break;
    case "egyptien":
      data = egyptienData[0] as ZodiacData;
      break;
    case "inuit":
      data = inuitData[0] as ZodiacData;
      break;
    case "vedique":
      data = vediqueData[0] as ZodiacData;
      break;
    case "druidique":
      data = druidiqueData[0] as ZodiacData;
      break;
    default:
      return null;
  }

  if (!data || !data.signs) {
    return null;
  }

  // Normaliser le nom du signe
  const normalizeName = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s*\([^)]*\)/g, "") // Enlever les éléments entre parenthèses
      .replace(/[''`]/g, "") // Enlever les apostrophes
      .replace(/\s+/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Enlever les diacritiques
  };

  const normalizedSignName = normalizeName(signName);

  // Mappings spécifiques pour certains systèmes
  const getSystemMapping = (key: string, signName: string): string | null => {
    const normalized = normalizeName(signName);

    // Mapping Alchimique : noms calculés -> noms dans JSON
    if (key === "alchimique") {
      const alchemicalMap: Record<string, string> = {
        calcination: "Nigredo",
        dissolution: "Nigredo",
        separation: "Albedo",
        séparation: "Albedo",
        conjonction: "Albedo",
        fermentation: "Rubedo",
        distillation: "Rubedo",
        coagulation: "Coagulatio",
      };
      return alchemicalMap[normalized] || null;
    }

    // Mapping Viking : noms calculés -> noms dans JSON
    if (key === "viking") {
      const firstWord = normalized.split(/\s+/)[0];
      const vikingMap: Record<string, string> = {
        bjorn: "création",
        ours: "création",
        "bjorn ours": "création",
        jormungand: "ascension",
        thor: "prospérité",
        fenrir: "conflit",
        odin: "déclin",
        loki: "renaissance",
        ragnarök: "renaissance",
      };
      return vikingMap[normalized] || vikingMap[firstWord] || null;
    }

    return null;
  };

  // Chercher le signe
  const mappedName = getSystemMapping(systemKey, signName);

  const sign = data.signs.find((s) => {
    const normalizedDataName = normalizeName(s.name);

    // Correspondance exacte
    if (normalizedDataName === normalizedSignName) {
      return true;
    }

    // Vérifier les noms mappés
    if (mappedName && normalizedDataName === normalizeName(mappedName)) {
      return true;
    }

    // Pour Aztèque : chercher aussi dans le champ "translation"
    if (systemKey === "azteque" && s.translation) {
      const normalizedTranslation = normalizeName(s.translation);
      if (normalizedTranslation === normalizedSignName) {
        return true;
      }
    }

    // Pour Viking : chercher aussi dans le champ "norseName"
    if (systemKey === "viking" && s.norseName) {
      const normalizedNorseName = normalizeName(s.norseName);
      if (normalizedNorseName === normalizedSignName) {
        return true;
      }
    }

    // Pour Druidique et Celtique : correspondance plus flexible pour les noms d'arbres
    if (systemKey === "druidique" || systemKey === "celtique") {
      const signWords = normalizedSignName.split(/\s+/).sort().join(" ");
      const dataWords = normalizedDataName.split(/\s+/).sort().join(" ");
      if (signWords === dataWords) {
        return true;
      }
    }

    // Correspondance partielle
    if (
      normalizedSignName.startsWith(normalizedDataName) ||
      normalizedDataName.startsWith(normalizedSignName) ||
      normalizedSignName.includes(normalizedDataName) ||
      normalizedDataName.includes(normalizedSignName)
    ) {
      return true;
    }

    return false;
  });

  if (!sign || !sign.period) {
    return null;
  }

  // Formater les dates
  const formatDate = (day: number, month: number): string => {
    const date = new Date(2000, month - 1, day);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
  };

  const fromDate = formatDate(sign.period.from.day, sign.period.from.month);
  const toDate = formatDate(sign.period.to.day, sign.period.to.month);

  return `${fromDate} - ${toDate}`;
}

/**
 * Récupère toutes les données détaillées d'un signe astrologique depuis les fichiers -signes.json
 */
export function getZodiacSignDetails(
  systemKey: string,
  signName: string
): ZodiacSignDetails | null {
  let data: ZodiacSignDetails[] | undefined;

  // Charger les données selon le système
  switch (systemKey) {
    case "occidental":
      data = occidentalSignesData as ZodiacSignDetails[];
      break;
    case "chinois":
      data = chinoisSignesData as ZodiacSignDetails[];
      break;
    case "maya":
      data = mayaSignesData as ZodiacSignDetails[];
      break;
    case "perse":
      data = perseSignesData as ZodiacSignDetails[];
      break;
    case "kabbalistique":
      data = kabbalistiqueSignesData as ZodiacSignDetails[];
      break;
    case "africain":
      data = africainSignesData as ZodiacSignDetails[];
      break;
    case "tibetain":
      data = tibetainSignesData as ZodiacSignDetails[];
      break;
    case "azteque":
      data = aztequeSignesData as ZodiacSignDetails[];
      break;
    case "alchimique":
      data = alchimiqueSignesData as ZodiacSignDetails[];
      break;
    case "amerindien":
      data = amerindienSignesData as ZodiacSignDetails[];
      break;
    case "celtique":
      data = celtiqueSignesData as ZodiacSignDetails[];
      break;
    case "viking":
      data = vikingSignesData as ZodiacSignDetails[];
      break;
    case "egyptien":
      data = egyptienSignesData as ZodiacSignDetails[];
      break;
    case "inuit":
      data = inuitSignesData as ZodiacSignDetails[];
      break;
    case "vedique":
      data = vediqueSignesData as ZodiacSignDetails[];
      break;
    case "druidique":
      data = druidiqueSignesData as ZodiacSignDetails[];
      break;
    default:
      return null;
  }

  if (!data || !Array.isArray(data)) {
    return null;
  }

  // Normaliser le nom du signe
  const normalizeName = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s*\([^)]*\)/g, "") // Enlever les éléments entre parenthèses
      .replace(/[''`]/g, "") // Enlever les apostrophes
      .replace(/\s+/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Enlever les diacritiques
  };

  // Pour le système chinois : convertir "Rat (Bois)" en "Rat de Bois" ou "Rat d'Eau" si l'élément commence par une voyelle
  let searchSignName = signName;
  if (systemKey === "chinois") {
    // Essayer plusieurs formats possibles : "Rat (Bois)", "Rat(Bois)", etc.
    const chineseMatch = signName.match(/^(.+?)\s*\((.+?)\)\s*$/);
    if (chineseMatch) {
      const animal = chineseMatch[1].trim();
      const element = chineseMatch[2].trim();
      // Utiliser "d'" si l'élément commence par une voyelle (Eau)
      const preposition = /^[aeiouAEIOU]/.test(element) ? "d'" : "de ";
      searchSignName = `${animal} ${preposition}${element}`;
    } else {
      // Si pas de parenthèses, peut-être que c'est déjà au format "Rat de Bois"
      // ou juste "Rat" - dans ce cas, on garde tel quel
    }
  }

  const normalizedSignName = normalizeName(searchSignName);

  // Mappings spécifiques pour certains systèmes
  const getSystemMapping = (key: string, signName: string): string | null => {
    const normalized = normalizeName(signName);

    // Mapping Chinois : "Rat (Bois)" -> "Rat de Bois" ou "Rat d'Eau" si l'élément commence par une voyelle
    if (key === "chinois") {
      const chineseMatch = signName.match(/^(.+?)\s*\((.+?)\)$/);
      if (chineseMatch) {
        const animal = chineseMatch[1].trim();
        const element = chineseMatch[2].trim();
        // Utiliser "d'" si l'élément commence par une voyelle (Eau)
        const preposition = /^[aeiouAEIOU]/.test(element) ? "d'" : "de ";
        return `${animal} ${preposition}${element}`;
      }
    }

    // Mapping Alchimique : noms calculés -> noms dans JSON
    if (key === "alchimique") {
      const alchemicalMap: Record<string, string> = {
        calcination: "Nigredo",
        dissolution: "Nigredo",
        separation: "Albedo",
        séparation: "Albedo",
        conjonction: "Albedo",
        fermentation: "Rubedo",
        distillation: "Rubedo",
        coagulation: "Coagulatio",
      };
      return alchemicalMap[normalized] || null;
    }

    // Mapping Viking : noms calculés -> noms dans JSON
    if (key === "viking") {
      const firstWord = normalized.split(/\s+/)[0];
      const vikingMap: Record<string, string> = {
        bjorn: "Création (Bjorn)",
        ours: "Création (Bjorn)",
        "bjorn ours": "Création (Bjorn)",
        "bjorn (ours)": "Création (Bjorn)",
        jormungand: "Ascension (Jormungand)",
        thor: "Prospérité (Thor)",
        fenrir: "Conflit (Fenrir)",
        odin: "Déclin (Odin)",
        loki: "Renaissance (Loki)",
        ragnarök: "Renaissance (Loki)",
      };
      return vikingMap[normalized] || vikingMap[firstWord] || null;
    }

    // Mapping Perse : noms calculés -> noms dans JSON
    if (key === "perse") {
      const perseMap: Record<string, string> = {
        sawr: "Sur",
        jawza: "Do-Pikar",
        saratan: "Saratane",
        sonbola: "Khoushe",
        mizan: "Mizan",
        aqrab: "Kazhdum",
        qaws: "Kaman",
        dalw: "Dalv",
        hut: "Hout",
      };
      return perseMap[normalized] || null;
    }

    // Mapping Védique : noms calculés -> noms dans JSON
    if (key === "vedique" || key === "védique") {
      const vedicMap: Record<string, string> = {
        vrishchika: "Vrischika",
      };
      return vedicMap[normalized] || null;
    }

    return null;
  };

  // Chercher le signe
  const mappedName = getSystemMapping(systemKey, signName);

  const sign = data.find((s) => {
    const normalizedDataName = normalizeName(s.name);

    // Correspondance exacte avec le nom converti
    if (normalizedDataName === normalizedSignName) {
      return true;
    }

    // Vérifier les noms mappés (pour chinois, cela sera "Rat de Bois")
    if (mappedName) {
      const normalizedMappedName = normalizeName(mappedName);
      if (normalizedDataName === normalizedMappedName) {
        return true;
      }
    }

    // Pour Aztèque : chercher aussi dans le champ "translation" si disponible
    if (systemKey === "azteque") {
      // Les noms aztèques ont la traduction entre parenthèses dans le nom
      const nameWithoutParens = normalizedDataName.replace(/\s*\([^)]*\)/g, "");
      if (nameWithoutParens === normalizedSignName) {
        return true;
      }
    }

    // Pour Chinois : chercher avec correspondance exacte de "animal de element"
    // Cette recherche doit être après les autres pour éviter les faux positifs
    if (systemKey === "chinois") {
      // Le normalizedSignName devrait déjà être "rat de bois" après conversion
      // Vérifier si ça correspond exactement
      if (normalizedDataName === normalizedSignName) {
        return true;
      }
      // Si le mappedName existe, vérifier aussi avec celui-ci
      if (mappedName) {
        const normalizedMappedName = normalizeName(mappedName);
        if (normalizedDataName === normalizedMappedName) {
          return true;
        }
      }
    }

    // Correspondance partielle (seulement si pas chinois pour éviter les faux positifs)
    if (systemKey !== "chinois") {
      if (
        normalizedSignName.startsWith(normalizedDataName) ||
        normalizedDataName.startsWith(normalizedSignName) ||
        normalizedSignName.includes(normalizedDataName) ||
        normalizedDataName.includes(normalizedSignName)
      ) {
        return true;
      }
    }

    return false;
  });

  return sign || null;
}
