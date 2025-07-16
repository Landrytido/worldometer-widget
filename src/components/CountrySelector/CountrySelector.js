// src/components/CountrySelector/CountrySelector.js (Avec drapeaux images)
import React from "react";
import styled from "styled-components";
import Flag from "../Flag/Flag";
import { COUNTRIES } from "../../data/countries";

const SelectorContainer = styled.div`
  margin: 20px 0;
  background: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #333;
  min-width: 250px;
`;

const StyledSelect = styled.select`
  background: #0a0a0a;
  color: #fff;
  border: 2px solid #00ff88;
  border-radius: 8px;
  padding: 15px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  &:focus {
    outline: none;
    border-color: #00cc70;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }

  &:hover {
    border-color: #00cc70;
  }

  option {
    background: #1a1a1a;
    color: #fff;
    padding: 12px;
    font-size: 1.1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
`;

const Label = styled.label`
  display: block;
  color: #00ff88;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  text-shadow: 0 0 5px rgba(0, 255, 136, 0.3);
`;

const SelectedCountry = styled.div`
  margin-top: 15px;
  padding: 12px;
  background: rgba(0, 255, 136, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

const CountrySelector = ({ selectedCountry, onCountryChange }) => {
  const handleChange = (e) => {
    console.log("Pays sélectionné:", e.target.value);
    onCountryChange(e.target.value);
  };

  const selectedCountryInfo = COUNTRIES[selectedCountry];

  return (
    <SelectorContainer>
      <Label>🌍 Sélectionner un pays :</Label>
      <StyledSelect value={selectedCountry} onChange={handleChange}>
        {Object.entries(COUNTRIES).map(([key, country]) => (
          <option key={key} value={key}>
            {country.name}
          </option>
        ))}
      </StyledSelect>

      {selectedCountryInfo && (
        <SelectedCountry>
          <Flag countryCode={selectedCountryInfo.countryCode} size="20px" />
          <span>Sélectionné: {selectedCountryInfo.name}</span>
        </SelectedCountry>
      )}
    </SelectorContainer>
  );
};

export default CountrySelector;
