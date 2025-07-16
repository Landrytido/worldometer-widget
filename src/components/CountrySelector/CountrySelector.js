// CountrySelector.js - Version Mobile Optimisée
import React from "react";
import styled from "styled-components";
import Flag from "../Flag/Flag";
import { COUNTRIES } from "../../data/countries";

const SelectorContainer = styled.div`
  margin: 15px 0;
  background: #1a1a1a;
  padding: 18px;
  border-radius: 12px;
  border: 2px solid #333;
  width: 100%;

  @media (min-width: 768px) {
    margin: 20px 0;
    padding: 20px;
    border-radius: 15px;
    min-width: 280px;
    max-width: 350px;
  }
`;

const StyledSelect = styled.select`
  background: #0a0a0a;
  color: #fff;
  border: 2px solid #00ff88;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  @media (min-width: 768px) {
    padding: 15px 20px;
    font-size: 1.1rem;
  }

  &:focus {
    outline: none;
    border-color: #00cc70;
    box-shadow: 0 0 8px rgba(0, 255, 136, 0.3);
  }

  option {
    background: #1a1a1a;
    color: #fff;
    padding: 10px;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
`;

const Label = styled.label`
  display: block;
  color: #00ff88;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 1rem;
  text-shadow: 0 0 5px rgba(0, 255, 136, 0.3);

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
`;

const SelectedCountry = styled.div`
  margin-top: 12px;
  padding: 10px;
  background: rgba(0, 255, 136, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #fff;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (min-width: 768px) {
    margin-top: 15px;
    padding: 12px;
    font-size: 1rem;
  }
`;

const CountrySelector = ({ selectedCountry, onCountryChange }) => {
  const handleChange = (e) => {
    onCountryChange(e.target.value);
  };

  const selectedCountryInfo = COUNTRIES[selectedCountry];

  return (
    <SelectorContainer>
      <Label>🌍 Pays :</Label>
      <StyledSelect value={selectedCountry} onChange={handleChange}>
        {Object.entries(COUNTRIES).map(([key, country]) => (
          <option key={key} value={key}>
            {country.name}
          </option>
        ))}
      </StyledSelect>

      {selectedCountryInfo && (
        <SelectedCountry>
          <Flag countryCode={selectedCountryInfo.countryCode} size="18px" />
          <span>{selectedCountryInfo.name}</span>
        </SelectedCountry>
      )}
    </SelectorContainer>
  );
};

export default CountrySelector;
