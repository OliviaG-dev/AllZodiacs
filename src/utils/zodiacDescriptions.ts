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
        calcination: "nigredo",
        dissolution: "nigredo",
        séparation: "albedo",
        conjonction: "albedo",
        fermentation: "rubedo",
        distillation: "rubedo",
        coagulation: "coagulatio",
      };
      return alchemicalMap[normalized] || null;
    }

    // Mapping Viking : noms calculés -> noms dans JSON
    if (key === "viking") {
      // Extraire le premier mot (pour gérer "bjorn ours" -> "bjorn")
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
        calcination: "nigredo",
        dissolution: "nigredo",
        séparation: "albedo",
        conjonction: "albedo",
        fermentation: "rubedo",
        distillation: "rubedo",
        coagulation: "coagulatio",
      };
      return alchemicalMap[normalized] || null;
    }

    // Mapping Viking : noms calculés -> noms dans JSON
    if (key === "viking") {
      // Extraire le premier mot (pour gérer "bjorn ours" -> "bjorn")
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
  }));
}
