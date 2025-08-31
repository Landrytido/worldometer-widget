// src/services/dataService.js
export class DataService {
  constructor() {
    // Point de référence dynamique (mis à jour selon les besoins)
    this.REFERENCE_DATE = new Date("2025-07-15T15:30:00.000Z");

    // Base Worldometer calibrée (valeur que vous avez vue : 8,234,799,630)
    this.WORLDOMETER_BASE = 8234799630;
    this.CALIBRATION_TIME = new Date("2025-07-15T15:30:00.000Z");

    // Données calibrées : on initialise uniquement le 'world' par défaut.
    // Les entrées pays seront créées ou mises à jour dynamiquement via
    // `calibrateFromAPI(countryISO2)` afin d'utiliser des valeurs officielles.
    this.DATA = {
      world: {
        population: this.WORLDOMETER_BASE,
        // taux par défaut (estimation) — peuvent être affinés par la suite
        birthRate: 4.2,
        deathRate: 2.0,
        countryCode: "world",
      },
    };
  }

  getCurrentData(countryCode) {
    const baseData = this.DATA[countryCode] || this.DATA.world;

    const currentTime = new Date();
    const secondsElapsed =
      (currentTime.getTime() - this.CALIBRATION_TIME.getTime()) / 1000;

    const totalBirths = Math.floor(secondsElapsed * baseData.birthRate);
    const totalDeaths = Math.floor(secondsElapsed * baseData.deathRate);
    const currentPopulation = baseData.population + totalBirths - totalDeaths;

    const yearStart = new Date("2025-01-01T00:00:00.000Z");
    const secondsSinceYearStart =
      (currentTime.getTime() - yearStart.getTime()) / 1000;

    const dayStart = new Date(currentTime);
    dayStart.setHours(0, 0, 0, 0);
    const secondsSinceDayStart =
      (currentTime.getTime() - dayStart.getTime()) / 1000;

    const worldometerData = {
      currentPopulation: currentPopulation,

      birthsThisYear: Math.floor(secondsSinceYearStart * baseData.birthRate),

      birthsToday: Math.floor(secondsSinceDayStart * baseData.birthRate),

      deathsThisYear: Math.floor(secondsSinceYearStart * baseData.deathRate),

      deathsToday: Math.floor(secondsSinceDayStart * baseData.deathRate),
    };

    return {
      population: currentPopulation,
      births: baseData.birthRate,
      deaths: baseData.deathRate,
      growth: baseData.birthRate - baseData.deathRate,
      totalBirths: totalBirths,
      totalDeaths: totalDeaths,
      // Ces valeurs sont calculées à partir d'une base calibrée.
      // Si une calibration officielle a été appliquée via `calibrateFromAPI`,
      // la base provient d'une source officielle (World Bank / OWID).
      isRealData: false,
      calibratedFromOfficial: !!this._lastCalibrationSource,

      worldometer: worldometerData,
    };
  }

  calibrateToWorldometer(newWorldometerValue) {
    this.WORLDOMETER_BASE = newWorldometerValue;
    this.CALIBRATION_TIME = new Date();
    this.DATA.world.population = newWorldometerValue;
  }

  async calibrateFromAPI(countryCodeISO2) {
    try {
      if (!countryCodeISO2) return null;

      const cacheKey = `population_cache_${countryCodeISO2}`;
      const now = Date.now();

      // Try cache first (24h)
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.value && parsed.ts && now - parsed.ts < 24 * 3600 * 1000) {
            // Apply calibration using cached value
            this.calibrateToWorldometer(parsed.value);
            this._lastCalibrationSource = parsed.source || 'cache';

            // Apply to country entry as well
            const iso2Key = countryCodeISO2 ? countryCodeISO2.toUpperCase() : null;
            if (iso2Key && iso2Key !== 'WORLD' && iso2Key !== 'UN') {
              const existing = this.DATA[iso2Key] || {};
              this.DATA[iso2Key] = {
                population: parsed.value,
                birthRate: existing.birthRate || 1.5,
                deathRate: existing.deathRate || 0.9,
                countryCode: iso2Key.toLowerCase(),
              };
            }

            return parsed.value;
          }
        }
      } catch (e) {
        // ignore localStorage errors
      }

      let iso3 = null;
      if (
        countryCodeISO2.toLowerCase() === 'world' ||
        countryCodeISO2.toLowerCase() === 'un'
      ) {
        iso3 = 'WLD';
      } else {
        // Fetch country info to get ISO3
        try {
          const resp = await fetch(
            `https://restcountries.com/v3.1/alpha/${countryCodeISO2}`
          );
          if (resp.ok) {
            const json = await resp.json();
            // json can be an array or object
            const entry = Array.isArray(json) ? json[0] : json;
            iso3 = entry?.cca3 || null;
          }
        } catch (e) {
          // ignore and fallback
          iso3 = null;
        }
      }

      // Fallback to WLD (world) if iso3 not found
      if (!iso3) iso3 = 'WLD';

      // Query World Bank for population (uses ISO3). We request last available year (per_page=1)
      const wbUrl = `https://api.worldbank.org/v2/country/${iso3}/indicator/SP.POP.TOTL?format=json&per_page=1`;
      try {
        const resp2 = await fetch(wbUrl);
        if (resp2.ok) {
          const json2 = await resp2.json();
          const value = json2?.[1]?.[0]?.value || null;
          if (value) {
            // Apply to global and country entry
            this.calibrateToWorldometer(value);
            this._lastCalibrationSource = 'worldbank';

            const iso2Key = countryCodeISO2 ? countryCodeISO2.toUpperCase() : null;
            if (iso2Key && iso2Key !== 'WORLD' && iso2Key !== 'UN') {
              const existing = this.DATA[iso2Key] || {};
              this.DATA[iso2Key] = {
                population: value,
                birthRate: existing.birthRate || 1.5,
                deathRate: existing.deathRate || 0.9,
                countryCode: iso2Key.toLowerCase(),
              };
            }

            try {
              localStorage.setItem(
                cacheKey,
                JSON.stringify({ value, ts: now, source: 'worldbank' })
              );
            } catch (e) {
              // ignore storage errors
            }
            return value;
          }
        }
      } catch (e) {
        // ignore network errors
      }

      return null;
    } catch (err) {
      // never throw from calibration to avoid breaking UI
      return null;
    }
  }

  // Retourne des infos de calibration pour un pays (si disponible dans le cache)
  getCalibrationInfo(countryCodeISO2) {
    try {
      if (!countryCodeISO2) return null;
      const cacheKey = `population_cache_${countryCodeISO2}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        return {
          source: parsed.source || this._lastCalibrationSource || null,
          ts: parsed.ts || null,
          value: parsed.value || null,
        };
      }
    } catch (e) {
      // ignore
    }

    // Fallback: return global calibration info if present
    return {
      source: this._lastCalibrationSource || null,
      ts: this.CALIBRATION_TIME ? this.CALIBRATION_TIME.getTime() : null,
      value: this.DATA?.world?.population || null,
    };
  }
}

export const dataService = new DataService();
