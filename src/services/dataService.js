// src/services/dataService.js
export class DataService {
  constructor() {
    // Point de référence dynamique (mis à jour selon les besoins)
    this.REFERENCE_DATE = new Date("2025-07-15T15:30:00.000Z");

    // Base Worldometer calibrée (valeur que vous avez vue : 8,234,799,630)
    this.WORLDOMETER_BASE = 8234799630;
    this.CALIBRATION_TIME = new Date("2025-07-15T15:30:00.000Z");

    // Données calibrées
    this.DATA = {
      world: {
        population: this.WORLDOMETER_BASE,
        birthRate: 4.2, // Selon données Worldometer
        deathRate: 2.0, // Selon données Worldometer
      },
      CM: { population: 28524175, birthRate: 1.52, deathRate: 0.42 },
      CG: { population: 6106869, birthRate: 0.83, deathRate: 0.31 },
      SN: { population: 18501984, birthRate: 1.94, deathRate: 0.35 },
      FR: { population: 68521974, birthRate: 2.11, deathRate: 1.82 },
      BE: { population: 11685814, birthRate: 0.42, deathRate: 0.37 },
      DE: { population: 84552242, birthRate: 2.04, deathRate: 3.26 },
      JP: { population: 123719238, birthRate: 0.66, deathRate: 3.76 },
      IN: { population: 1441719852, birthRate: 6.58, deathRate: 2.89 },
      CN: { population: 1425857400, birthRate: 4.02, deathRate: 2.74 },
      US: { population: 341145670, birthRate: 3.78, deathRate: 3.61 },
      CA: { population: 39742430, birthRate: 1.33, deathRate: 1.06 },
      MX: { population: 132328035, birthRate: 6.04, deathRate: 2.13 },
      BR: { population: 217637297, birthRate: 7.75, deathRate: 2.42 },
      AR: { population: 46245668, birthRate: 2.09, deathRate: 1.23 },
      CO: { population: 52695952, birthRate: 2.21, deathRate: 0.81 },
      AU: { population: 26639544, birthRate: 1.07, deathRate: 0.59 },
      NZ: { population: 5228100, birthRate: 0.218, deathRate: 0.128 },
      FJ: { population: 936375, birthRate: 0.047, deathRate: 0.019 },
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

    // Calculs pour Worldometer style
    const yearStart = new Date("2025-01-01T00:00:00.000Z");
    const secondsSinceYearStart =
      (currentTime.getTime() - yearStart.getTime()) / 1000;

    const dayStart = new Date(currentTime);
    dayStart.setHours(0, 0, 0, 0);
    const secondsSinceDayStart =
      (currentTime.getTime() - dayStart.getTime()) / 1000;

    // Données Worldometer
    const worldometerData = {
      // Population actuelle
      currentPopulation: currentPopulation,

      // Naissances cette année
      birthsThisYear: Math.floor(secondsSinceYearStart * baseData.birthRate),

      // Naissances aujourd'hui
      birthsToday: Math.floor(secondsSinceDayStart * baseData.birthRate),

      // Décès cette année
      deathsThisYear: Math.floor(secondsSinceYearStart * baseData.deathRate),

      // Décès aujourd'hui
      deathsToday: Math.floor(secondsSinceDayStart * baseData.deathRate),
    };

    // Debug log
    if (countryCode === "world") {
      console.log(`🌍 Style Worldometer:`);
      console.log(
        `Population: ${worldometerData.currentPopulation.toLocaleString()}`
      );
      console.log(
        `Naissances année: ${worldometerData.birthsThisYear.toLocaleString()}`
      );
      console.log(
        `Naissances aujourd'hui: ${worldometerData.birthsToday.toLocaleString()}`
      );
    }

    return {
      // Compatibilité ancienne
      population: currentPopulation,
      births: baseData.birthRate,
      deaths: baseData.deathRate,
      growth: baseData.birthRate - baseData.deathRate,
      totalBirths: totalBirths,
      totalDeaths: totalDeaths,
      isRealData: true,

      // Nouvelles données Worldometer
      worldometer: worldometerData,
    };
  }

  // Méthode pour recalibrer sur Worldometer
  calibrateToWorldometer(newWorldometerValue) {
    console.log(
      `🔧 Recalibration: ${this.WORLDOMETER_BASE.toLocaleString()} → ${newWorldometerValue.toLocaleString()}`
    );
    this.WORLDOMETER_BASE = newWorldometerValue;
    this.CALIBRATION_TIME = new Date();
    this.DATA.world.population = newWorldometerValue;
  }
}

export const dataService = new DataService();
