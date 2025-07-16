// src/data/metrics.js
import { getRandomMessage } from "./messages";

export const WORLDOMETER_METRICS = {
  currentPopulation: {
    name: "Population mondiale actuelle",
    icon: "🌍",
    type: "single",
  },
  birthsThisYear: {
    name: "Naissances cette année",
    icon: "🍼",
    type: "single",
  },
  birthsToday: {
    name: "Naissances aujourd'hui",
    icon: "👶",
    type: "single",
  },
  deathsThisYear: {
    name: "Décès cette année",
    icon: "⚰️",
    type: "single",
  },
  deathsToday: {
    name: "Décès aujourd'hui",
    icon: "💀",
    type: "single",
  },
};

// Messages par type de métrique
const MESSAGE_TYPES = {
  currentPopulation: "population",
  birthsThisYear: "births",
  birthsToday: "births",
  deathsThisYear: "deaths",
  deathsToday: "deaths",
};

// Fonction pour obtenir un message dynamique
export const getDynamicMessage = (metricKey, countryCode) => {
  const messageType = MESSAGE_TYPES[metricKey] || "population";
  return getRandomMessage(messageType, countryCode);
};

// Ancien système pour compatibilité
export const METRICS = {
  population: {
    name: "Population",
    icon: "👥",
    message: "🎉 Plus nous sommes, plus c'est... compliqué !",
    unit: "personnes",
  },
  births: {
    name: "Naissances",
    icon: "👶",
    message: "👶 Bienvenue dans ce monde merveilleux... ou pas !",
    unit: "par seconde",
  },
  deaths: {
    name: "Décès",
    icon: "💀",
    message: "💀 C'est le cycle de la vie, comme dit Simba",
    unit: "par seconde",
  },
  growth: {
    name: "Croissance",
    icon: "📈",
    message: "📈 La population explose... littéralement !",
    unit: "par seconde",
  },
};
