import React, { useState, useRef, useEffect } from "react";
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
  position: relative;

  @media (min-width: 768px) {
    margin: 20px 0;
    padding: 20px;
    border-radius: 15px;
    min-width: 280px;
    max-width: 350px;
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

const CustomSelect = styled.div`
  position: relative;
`;

const SelectButton = styled.button`
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    padding: 15px 20px;
    font-size: 1.1rem;
  }

  &:focus {
    outline: none;
    border-color: #00cc70;
    box-shadow: 0 0 8px rgba(0, 255, 136, 0.3);
  }

  &:hover {
    border-color: #00cc70;
  }

  &.open {
    border-color: #00cc70;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const Arrow = styled.span`
  font-size: 0.8rem;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #1a1a1a;
  border: 2px solid #00cc70;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "block" : "none")};

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #0a0a0a;
  }

  &::-webkit-scrollbar-thumb {
    background: #00ff88;
    border-radius: 4px;
  }
`;

const DropdownOption = styled.div`
  padding: 12px 16px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  border-bottom: 1px solid #333;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(0, 255, 136, 0.1);
  }

  &.selected {
    background: rgba(0, 255, 136, 0.2);
    color: #00ff88;
  }

  @media (min-width: 768px) {
    padding: 14px 20px;
    font-size: 1.1rem;
  }
`;

const CountryName = styled.span`
  flex: 1;
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
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Trier les pays : Monde en premier, puis alphabétique
  const sortedCountries = Object.entries(COUNTRIES).sort(
    ([keyA, a], [keyB, b]) => {
      if (keyA === "world") return -1;
      if (keyB === "world") return 1;
      return a.name.localeCompare(b.name);
    }
  );

  const selectedCountryInfo = COUNTRIES[selectedCountry];

  // Fermer la liste quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (countryKey) => {
    onCountryChange(countryKey);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SelectorContainer>
      <Label>🌍 Pays :</Label>

      <CustomSelect ref={selectRef}>
        <SelectButton onClick={toggleOpen} className={isOpen ? "open" : ""}>
          <SelectedOption>
            {selectedCountryInfo && (
              <>
                <Flag
                  countryCode={selectedCountryInfo.countryCode}
                  size="20px"
                />
                <span>{selectedCountryInfo.name}</span>
              </>
            )}
          </SelectedOption>
          <Arrow isOpen={isOpen}>▼</Arrow>
        </SelectButton>

        <DropdownList isOpen={isOpen}>
          {sortedCountries.map(([key, country]) => (
            <DropdownOption
              key={key}
              onClick={() => handleSelect(key)}
              className={key === selectedCountry ? "selected" : ""}
            >
              <Flag countryCode={country.countryCode} size="20px" />
              <CountryName>{country.name}</CountryName>
            </DropdownOption>
          ))}
        </DropdownList>
      </CustomSelect>

      {selectedCountryInfo && (
        <SelectedCountry>
          <Flag countryCode={selectedCountryInfo.countryCode} size="18px" />
          <span>Sélectionné: {selectedCountryInfo.name}</span>
        </SelectedCountry>
      )}
    </SelectorContainer>
  );
};

export default CountrySelector;
