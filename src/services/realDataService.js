// src/services/realDataService.js
export class RealDataService {
  constructor() {
    this.baseData = {
      world: {
        population: 8234752894, // Données actuelles de Worldometer
        birthRate: 4.1, // naissances par seconde
        deathRate: 1.8, // décès par seconde
        lastUpdate: Date.now(),
      },
      CM: { population: 28524175, birthRate: 1.5, deathRate: 0.4 },
      CG: { population: 6106869, birthRate: 0.8, deathRate: 0.3 },
      SN: { population: 18501984, birthRate: 1.9, deathRate: 0.3 },
      FR: { population: 68521974, birthRate: 1.9, deathRate: 1.7 },
      BE: { population: 11685814, birthRate: 0.33, deathRate: 0.29 },
      DE: { population: 84552242, birthRate: 1.8, deathRate: 2.9 },
      JP: { population: 123719238, birthRate: 0.6, deathRate: 2.9 },
      IN: { population: 1441719852, birthRate: 5.2, deathRate: 2.2 },
      CN: { population: 1425857400, birthRate: 2.8, deathRate: 2.3 },
      US: { population: 345426571, birthRate: 3.7, deathRate: 2.5 },
      CA: { population: 39742430, birthRate: 1.1, deathRate: 0.9 },
      MX: { population: 132328035, birthRate: 4.9, deathRate: 1.9 },
      BR: { population: 217637297, birthRate: 6.2, deathRate: 1.9 },
      AR: { population: 46245668, birthRate: 1.7, deathRate: 0.9 },
      CO: { population: 52695952, birthRate: 1.8, deathRate: 0.6 },
      AU: { population: 26639544, birthRate: 1.0, deathRate: 0.8 },
      NZ: { population: 5228100, birthRate: 0.18, deathRate: 0.1 },
      FJ: { population: 936375, birthRate: 0.032, deathRate: 0.012 },
    };
    this.startTime = Date.now();
  }

  async fetchRealTimeData() {
    try {
      // Tentative de scraping Worldometer via proxy
      const proxyUrl = "https://api.allorigins.win/raw?url=";
      const worldometerUrl = "https://worldometers.info/world-population/";

      const response = await fetch(
        proxyUrl + encodeURIComponent(worldometerUrl)
      );
      const html = await response.text();

      const realData = this.parseWorldometerHTML(html);
      if (realData.population > 0) {
        this.baseData.world = {
          ...this.baseData.world,
          ...realData,
          lastUpdate: Date.now(),
        };
      }
    } catch (error) {
      console.log("Scraping failed, using fallback data:", error);
    }
  }

  parseWorldometerHTML(html) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Chercher le compteur principal de population
      const populationEl = doc.querySelector(".maincounter-number");

      if (populationEl) {
        const population = parseInt(
          populationEl.textContent.replace(/[,\s]/g, "")
        );
        return {
          population: population,
          birthRate: 4.1, // approximation basée sur données annuelles
          deathRate: 1.8,
        };
      }
    } catch (error) {
      console.error("Parse error:", error);
    }
    return {};
  }

  getCurrentData(countryCode) {
    console.log("Récupération données pour:", countryCode);
    const baseData = this.baseData[countryCode];
    if (!baseData) {
      console.error("Données non trouvées pour:", countryCode);
      // Retourner des données par défaut
      return {
        population: 0,
        births: 0,
        deaths: 0,
        growth: 0,
        totalBirths: 0,
        totalDeaths: 0,
      };
    }

    const secondsElapsed = (Date.now() - this.startTime) / 1000;
    const births = Math.floor(secondsElapsed * baseData.birthRate);
    const deaths = Math.floor(secondsElapsed * baseData.deathRate);

    const result = {
      population: baseData.population + births - deaths,
      births: baseData.birthRate,
      deaths: baseData.deathRate,
      growth: baseData.birthRate - baseData.deathRate,
      totalBirths: births,
      totalDeaths: deaths,
    };

    console.log("Données calculées:", result);
    return result;
  }
}

export const realDataService = new RealDataService();
