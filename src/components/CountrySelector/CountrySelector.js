import React from "react";
import styled from "styled-components";
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Color Emoji",
    sans-serif;

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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Noto Color Emoji", sans-serif;
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

const CountrySelector = ({ selectedCountry, onCountryChange }) => {
  const handleChange = (e) => {
    console.log("Pays sélectionné:", e.target.value);
    onCountryChange(e.target.value);
  };

  return (
    <SelectorContainer>
      <Label>🌍 Sélectionner un pays :</Label>
      <StyledSelect value={selectedCountry} onChange={handleChange}>
        {Object.entries(COUNTRIES).map(([key, country]) => (
          <option key={key} value={key}>
            {country.flag} {country.name}
          </option>
        ))}
      </StyledSelect>
      <div style={{ marginTop: "10px", color: "#888", fontSize: "0.9rem" }}>
        Sélectionné: {COUNTRIES[selectedCountry]?.flag}{" "}
        {COUNTRIES[selectedCountry]?.name}
      </div>
    </SelectorContainer>
  );
};

export default CountrySelector;
