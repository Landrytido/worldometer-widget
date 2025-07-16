// src/hooks/useCounters.js
import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";

export const useCounters = (countryCode) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;

    const fetchAndUpdateData = () => {
      try {
        setError(null);

        // Récupérer données synchronisées
        const currentData = dataService.getCurrentData(countryCode);
        setData(currentData);

        // Log pour debug
        if (countryCode === "world") {
          console.log(
            `🌍 Population mondiale: ${currentData.population.toLocaleString()}`
          );
        }

        setIsLoading(false);

        // Mise à jour chaque seconde
        interval = setInterval(() => {
          const updatedData = dataService.getCurrentData(countryCode);
          setData(updatedData);
        }, 1000);
      } catch (err) {
        console.error("Erreur service:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAndUpdateData();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countryCode]);

  return { data, isLoading, error };
};
