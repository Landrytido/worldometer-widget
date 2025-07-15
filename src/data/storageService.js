export const storageService = {
  savePreferences: (preferences) => {
    localStorage.setItem(
      "worldometer-preferences",
      JSON.stringify(preferences)
    );
  },

  loadPreferences: () => {
    const saved = localStorage.getItem("worldometer-preferences");
    return saved
      ? JSON.parse(saved)
      : {
          selectedCountry: "world",
          selectedMetrics: ["population", "births", "deaths"],
        };
  },
};
