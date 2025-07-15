import axios from "axios";

const MOCK_DATA = {
  world: {
    population: 8000000000,
    birthRate: 4.3,
    deathRate: 1.8,
    growthRate: 2.5,
  },
};

export const apiService = {
  getCountryData: async (countryCode) => {
    return MOCK_DATA[countryCode] || MOCK_DATA.world;
  },
};
