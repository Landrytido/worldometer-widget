// src/hooks/usePreferences.js (Avec sélecteur de métriques)
import { useState, useEffect } from "react";

const DEFAULT_PREFERENCES = {
  selectedCountry: "world",
  fullscreenMode: false,
  // Nouvelles métriques Worldometer par défaut
  selectedMetrics: ["currentPopulation", "birthsThisYear", "deathsThisYear"],
};

export const usePreferences = () => {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadPreferences = () => {
      try {
        const saved = localStorage.getItem("worldometer-preferences");
        if (saved) {
          const parsed = JSON.parse(saved);

          // Migration des anciennes métriques vers les nouvelles
          let migratedMetrics = parsed.selectedMetrics;
          if (migratedMetrics && migratedMetrics.includes("population")) {
            migratedMetrics = migratedMetrics.map((metric) => {
              switch (metric) {
                case "population":
                  return "currentPopulation";
                case "births":
                  return "birthsThisYear";
                case "deaths":
                  return "deathsThisYear";
                case "growth":
                  return "birthsToday";
                default:
                  return metric;
              }
            });
          }

          setPreferences({
            ...DEFAULT_PREFERENCES,
            selectedCountry:
              parsed.selectedCountry || DEFAULT_PREFERENCES.selectedCountry,
            fullscreenMode:
              parsed.fullscreenMode || DEFAULT_PREFERENCES.fullscreenMode,
            selectedMetrics:
              migratedMetrics || DEFAULT_PREFERENCES.selectedMetrics,
          });
        }
      } catch (error) {
        console.error("Erreur chargement préférences:", error);
        setPreferences(DEFAULT_PREFERENCES);
      } finally {
        setIsLoaded(true);
      }
    };

    loadPreferences();
  }, []);

  const updatePreferences = (newPrefs) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    try {
      localStorage.setItem("worldometer-preferences", JSON.stringify(updated));
    } catch (error) {
      console.error("Erreur sauvegarde préférences:", error);
    }
  };

  return [preferences, updatePreferences, isLoaded];
};
