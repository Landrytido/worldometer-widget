import { COUNTRIES } from "../data/countries";

export const generateDynamicTitle = (metricKey, countryCode) => {
  const country = COUNTRIES[countryCode];

  if (metricKey === "currentPopulation") {
    const getCountryAdjective = (countryCode) => {
      if (countryCode === "world") return "mondiale";

      const adjectives = {
        FR: "française",
        CM: "camerounaise",
        CG: "congolaise",
        SN: "sénégalaise",
        BE: "belge",
        DE: "allemande",
        JP: "japonaise",
        IN: "indienne",
        CN: "chinoise",
        US: "américaine",
        CA: "canadienne",
        MX: "mexicaine",
        BR: "brésilienne",
        AR: "argentine",
        CO: "colombienne",
        AU: "australienne",
        NZ: "néo-zélandaise",
        FJ: "fidjienne",
      };

      return adjectives[countryCode] || `de ${country?.name || "ce pays"}`;
    };

    const adjective = getCountryAdjective(countryCode);
    return `Population ${adjective} actuelle`;
  }

  const genericTitles = {
    birthsThisYear: "Naissances cette année",
    birthsToday: "Naissances aujourd'hui",
    deathsThisYear: "Décès cette année",
    deathsToday: "Décès aujourd'hui",
  };

  return genericTitles[metricKey] || "Statistique";
};

/**
 * 🔥 NOUVELLE FONCTION : Génère l'icône selon la métrique et le pays
 */
export const generateDynamicIcon = (metricKey, countryCode) => {
  // 🎯 SEULEMENT la population change d'icône
  if (metricKey === "currentPopulation") {
    if (countryCode === "world") {
      return "🌍"; // Globe pour le monde
    } else {
      return "FLAG"; // Indicateur spécial pour utiliser Flag component
    }
  }

  // 🎯 TOUTES LES AUTRES gardent leur icône originale
  const defaultIcons = {
    birthsThisYear: "🍼",
    birthsToday: "👶",
    deathsThisYear: "⚰️",
    deathsToday: "💀",
  };

  return defaultIcons[metricKey] || "📊";
};

/**
 * Version simplifiée pour des titres plus courts
 */
export const generateShortTitle = (metricKey, countryCode) => {
  const country = COUNTRIES[countryCode];
  const countryName = country?.name || "Monde";

  if (countryCode === "world") {
    return generateDynamicTitle(metricKey, countryCode);
  }

  // Titres courts pour les pays
  switch (metricKey) {
    case "currentPopulation":
      return `Population ${countryName}`;

    case "birthsThisYear":
      return `Naissances ${countryName} (année)`;

    case "birthsToday":
      return `Naissances ${countryName} (aujourd'hui)`;

    case "deathsThisYear":
      return `Décès ${countryName} (année)`;

    case "deathsToday":
      return `Décès ${countryName} (aujourd'hui)`;

    default:
      return `${countryName} - Statistique`;
  }
};
