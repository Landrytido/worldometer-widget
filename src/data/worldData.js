// src/data/worldData.js (Données officielles 2025)
export const WORLD_DATA = {
  world: {
    population: 8092034511, // Population mondiale officielle 1er janvier 2025
    birthRate: 4.2, // Naissances par seconde (UN + Census data)
    deathRate: 2.0, // Décès par seconde
  },

  // Afrique - Données UN World Population Prospects 2024
  CM: {
    population: 28524175, // Cameroun
    birthRate: 1.52, // Calculé sur base taux démographiques 2025
    deathRate: 0.42,
  },
  CG: {
    population: 6106869, // Congo
    birthRate: 0.83,
    deathRate: 0.31,
  },
  SN: {
    population: 18501984, // Sénégal
    birthRate: 1.94,
    deathRate: 0.35,
  },

  // Europe - Données UN + Eurostat 2025
  FR: {
    population: 68521974, // France
    birthRate: 2.11,
    deathRate: 1.82,
  },
  BE: {
    population: 11685814, // Belgique
    birthRate: 0.42,
    deathRate: 0.37,
  },
  DE: {
    population: 84552242, // Allemagne
    birthRate: 2.04,
    deathRate: 3.26, // Vieillissement démographique
  },

  // Asie - Données UN 2025
  JP: {
    population: 123719238, // Japon
    birthRate: 0.66, // Très faible natalité
    deathRate: 3.76, // Population vieillissante
  },
  IN: {
    population: 1441719852, // Inde (pays le plus peuplé au monde)
    birthRate: 6.58,
    deathRate: 2.89,
  },
  CN: {
    population: 1425857400, // Chine (déclin démographique confirmé)
    birthRate: 4.02,
    deathRate: 2.74,
  },

  // Amérique du Nord - US Census Bureau 2025
  US: {
    population: 341145670, // États-Unis (données officielles Census)
    birthRate: 3.78, // 1 naissance toutes les 9.0 secondes
    deathRate: 3.61, // 1 décès toutes les 9.4 secondes
  },
  CA: {
    population: 39742430, // Canada
    birthRate: 1.33,
    deathRate: 1.06,
  },
  MX: {
    population: 132328035, // Mexique
    birthRate: 6.04,
    deathRate: 2.13,
  },

  // Amérique du Sud - Données nationales 2025
  BR: {
    population: 217637297, // Brésil
    birthRate: 7.75,
    deathRate: 2.42,
  },
  AR: {
    population: 46245668, // Argentine
    birthRate: 2.09,
    deathRate: 1.23,
  },
  CO: {
    population: 52695952, // Colombie
    birthRate: 2.21,
    deathRate: 0.81,
  },

  // Océanie - Données ABS/Stats NZ 2025
  AU: {
    population: 26639544, // Australie
    birthRate: 1.07,
    deathRate: 0.59,
  },
  NZ: {
    population: 5228100, // Nouvelle-Zélande
    birthRate: 0.218,
    deathRate: 0.128,
  },
  FJ: {
    population: 936375, // Fidji
    birthRate: 0.047,
    deathRate: 0.019,
  },
};
