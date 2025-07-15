import { useState, useEffect } from "react";
import { populationIOService } from "../services/populationIOService";

export const useCounters = (countryCode) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;

    const fetchAndUpdateData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const currentData = await populationIOService.getCurrentData(
          countryCode
        );
        setData(currentData);

        // Mettre à jour toutes les secondes
        interval = setInterval(async () => {
          const updatedData = await populationIOService.getCurrentData(
            countryCode
          );
          setData(updatedData);
        }, 1000);
      } catch (err) {
        console.error("Erreur hook useCounters:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndUpdateData();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countryCode]);

  return { data, isLoading, error };
};
