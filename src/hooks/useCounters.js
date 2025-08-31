// src/hooks/useCounters.js
import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";

export const useCounters = (countryCode) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval = null;
    let mounted = true;

    const startPolling = () => {
      try {
        // Première lecture immédiate
        const currentData = dataService.getCurrentData(countryCode);
        if (!mounted) return;
        setData(currentData);
        setIsLoading(false);

        // Poll every 5 seconds to reduce load but keep UI feeling live
        interval = setInterval(() => {
          try {
            const updatedData = dataService.getCurrentData(countryCode);
            if (!mounted) return;
            setData(updatedData);
          } catch (e) {
            // ignore per-interval errors
          }
        }, 5000);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || String(err));
        setIsLoading(false);
      }
    };

    // Try to calibrate from API first (best effort). If calibration completes or fails, start polling.
    (async () => {
      try {
        await dataService.calibrateFromAPI(countryCode);
      } catch (e) {
        // ignore calibration errors
      } finally {
        if (mounted) startPolling();
      }
    })();

    return () => {
      mounted = false;
      if (interval) clearInterval(interval);
    };
  }, [countryCode]);

  return { data, isLoading, error };
};
