import { useState, useEffect } from "react";

const DEFAULT_PREFERENCES = {
  selectedCountry: "world",
  selectedMetrics: ["population", "births", "deaths"],
  fullscreenMode: false,
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
          setPreferences({
            ...DEFAULT_PREFERENCES,
            ...parsed,
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
