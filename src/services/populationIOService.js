// src/services/populationIOService.js
export class PopulationIOService {
  constructor() {
    this.baseURL = "https://api.population.io/1.0";
    this.cache = new Map();
    this.lastUpdate = new Map();
    this.updateInterval = 30000; // 30 secondes
  }

  getPopulationIOCountryName(countryCode) {
    const countryMapping = {
      world: "World",
      CM: "Cameroon",
      CG: "Republic of the Congo",
      SN: "Senegal",
      FR: "France",
      BE: "Belgium",
      DE: "Germany",
      JP: "Japan",
      IN: "India",
      CN: "China",
      US: "United States",
      CA: "Canada",
      MX: "Mexico",
      BR: "Brazil",
      AR: "Argentina",
      CO: "Colombia",
      AU: "Australia",
      NZ: "New Zealand",
      FJ: "Fiji",
    };
    return countryMapping[countryCode] || "World";
  }

  // Récupérer la population totale d'un pays pour une année donnée
  async getPopulation(countryCode) {
    try {
      const countryName = this.getPopulationIOCountryName(countryCode);
      const year = new Date().getFullYear();

      const url = `${this.baseURL}/population/${encodeURIComponent(
        countryName
      )}/total/${year}/`;
      console.log("Fetching from:", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Population.io response:", data);

      // L'API retourne un tableau avec la population totale
      if (data && data.total_population) {
        return data.total_population.population;
      } else if (data && Array.isArray(data) && data.length > 0) {
        return data[0].total_population;
      }

      throw new Error("Format de données inattendu");
    } catch (error) {
      console.error(`Erreur API Population.io pour ${countryCode}:`, error);
      return this.getFallbackPopulation(countryCode);
    }
  }

  // Récupérer l'espérance de vie (pour calculer les taux)
  async getLifeExpectancy(countryCode) {
    try {
      const countryName = this.getPopulationIOCountryName(countryCode);
      const today = new Date().toISOString().split("T")[0];

      const url = `${this.baseURL}/life-expectancy/total/${encodeURIComponent(
        countryName
      )}/${today}/`;

      const response = await fetch(url);
      if (!response.ok) return null;

      const data = await response.json();
      return data.total_life_expectancy || 75; // fallback
    } catch (error) {
      console.error("Erreur espérance de vie:", error);
      return 75; // fallback
    }
  }

  // Données de fallback si l'API échoue
  getFallbackPopulation(countryCode) {
    const fallbackData = {
      world: 8234752894,
      CM: 28524175,
      CG: 6106869,
      SN: 18501984,
      FR: 68521974,
      BE: 11685814,
      DE: 84552242,
      JP: 123719238,
      IN: 1441719852,
      CN: 1425857400,
      US: 345426571,
      CA: 39742430,
      MX: 132328035,
      BR: 217637297,
      AR: 46245668,
      CO: 52695952,
      AU: 26639544,
      NZ: 5228100,
      FJ: 936375,
    };
    return fallbackData[countryCode] || 8000000000;
  }

  // Calculer les taux de naissance/décès basés sur des données démographiques réelles
  calculateRates(population, countryCode) {
    // Taux approximatifs basés sur les données mondiales 2025
    const rates = {
      world: { birth: 18.1, death: 7.8 }, // pour 1000 habitants par an
      CM: { birth: 35.8, death: 8.1 },
      CG: { birth: 32.7, death: 7.8 },
      SN: { birth: 32.1, death: 5.7 },
      FR: { birth: 11.9, death: 9.7 },
      BE: { birth: 11.1, death: 9.7 },
      DE: { birth: 9.3, death: 11.8 },
      JP: { birth: 7.3, death: 11.7 },
      IN: { birth: 17.6, death: 7.3 },
      CN: { birth: 10.9, death: 7.4 },
      US: { birth: 12.0, death: 8.9 },
      CA: { birth: 10.3, death: 8.2 },
      MX: { birth: 17.6, death: 6.2 },
      BR: { birth: 13.8, death: 6.8 },
      AR: { birth: 16.5, death: 7.7 },
      CO: { birth: 16.1, death: 5.9 },
      AU: { birth: 12.3, death: 6.8 },
      NZ: { birth: 12.8, death: 7.5 },
      FJ: { birth: 18.4, death: 6.3 },
    };

    const countryRates = rates[countryCode] || rates.world;

    // Convertir en naissances/décès par seconde
    const birthsPerSecond =
      (population * countryRates.birth) / 1000 / (365 * 24 * 3600);
    const deathsPerSecond =
      (population * countryRates.death) / 1000 / (365 * 24 * 3600);

    return {
      birthRate: birthsPerSecond,
      deathRate: deathsPerSecond,
    };
  }

  // Méthode principale pour récupérer toutes les données
  async getCurrentData(countryCode) {
    try {
      console.log("🌍 Récupération données Population.io pour:", countryCode);

      // Vérifier le cache
      const cacheKey = countryCode;
      const lastUpdate = this.lastUpdate.get(cacheKey);
      const now = Date.now();

      if (lastUpdate && now - lastUpdate < this.updateInterval) {
        const cached = this.cache.get(cacheKey);
        if (cached) {
          // Recalculer juste les compteurs temps réel
          return this.updateCounters(cached);
        }
      }

      // Récupérer de vraies données
      const population = await this.getPopulation(countryCode);
      const rates = this.calculateRates(population, countryCode);

      const baseData = {
        basePopulation: population,
        birthRate: rates.birthRate,
        deathRate: rates.deathRate,
        startTime: now,
        countryCode: countryCode,
      };

      // Mettre en cache
      this.cache.set(cacheKey, baseData);
      this.lastUpdate.set(cacheKey, now);

      console.log("✅ Données récupérées:", {
        pays: countryCode,
        population: population.toLocaleString(),
        naissances_sec: rates.birthRate.toFixed(2),
        deces_sec: rates.deathRate.toFixed(2),
      });

      return this.updateCounters(baseData);
    } catch (error) {
      console.error("❌ Erreur service Population.io:", error);

      // Fallback avec données statiques
      const fallbackPop = this.getFallbackPopulation(countryCode);
      const fallbackRates = this.calculateRates(fallbackPop, countryCode);

      return {
        population: fallbackPop,
        births: fallbackRates.birthRate,
        deaths: fallbackRates.deathRate,
        growth: fallbackRates.birthRate - fallbackRates.deathRate,
        totalBirths: 0,
        totalDeaths: 0,
        isRealData: false,
      };
    }
  }

  // Mettre à jour les compteurs en temps réel
  updateCounters(baseData) {
    const secondsElapsed = (Date.now() - baseData.startTime) / 1000;
    const births = Math.floor(secondsElapsed * baseData.birthRate);
    const deaths = Math.floor(secondsElapsed * baseData.deathRate);

    return {
      population: baseData.basePopulation + births - deaths,
      births: baseData.birthRate,
      deaths: baseData.deathRate,
      growth: baseData.birthRate - baseData.deathRate,
      totalBirths: births,
      totalDeaths: deaths,
      isRealData: true,
    };
  }
}

export const populationIOService = new PopulationIOService();
