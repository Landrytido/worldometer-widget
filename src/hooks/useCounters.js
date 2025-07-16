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

        const currentData = dataService.getCurrentData(countryCode);
        setData(currentData);

        setIsLoading(false);

        interval = setInterval(() => {
          const updatedData = dataService.getCurrentData(countryCode);
          setData(updatedData);
        }, 1000);
      } catch (err) {
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
