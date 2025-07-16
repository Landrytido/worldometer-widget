// MetricSelector.js - Version Mobile Optimisée
import React from "react";
import styled from "styled-components";
import { WORLDOMETER_METRICS } from "../../data/metrics";
import {
  generateDynamicTitle,
  generateDynamicIcon,
} from "../../utils/titleGenerator";
import { COUNTRIES } from "../../data/countries";
import Flag from "../Flag/Flag";

const MetricSelectorContainer = styled.div`
  margin: 15px 0;
  background: #1a1a1a;
  padding: 18px;
  border-radius: 12px;
  border: 2px solid #333;
  width: 100%;

  @media (min-width: 768px) {
    margin: 20px 0;
    padding: 25px;
    border-radius: 15px;
    min-width: 350px;
  }
`;

const MetricLabel = styled.div`
  color: #00ff88;
  margin-bottom: 15px;
  font-weight: 700;
  font-size: 1rem;
  text-shadow: 0 0 5px rgba(0, 255, 136, 0.3);
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  }

  @media (min-width: 768px) {
    gap: 15px;
  }
`;

const MetricButton = styled.button`
  padding: 12px 8px;
  border: 2px solid ${(props) => (props.selected ? "#00ff88" : "#444")};
  background: ${(props) => (props.selected ? "#00ff88" : "#0a0a0a")};
  color: ${(props) => (props.selected ? "#000" : "#fff")};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  font-size: 0.8rem;
  text-align: center;
  min-height: 70px;

  @media (min-width: 480px) {
    padding: 15px 12px;
    font-size: 0.9rem;
    min-height: 80px;
  }

  @media (min-width: 768px) {
    padding: 18px 16px;
    font-size: 1rem;
    min-height: 90px;
    border-radius: 12px;
  }

  &:hover {
    border-color: #00ff88;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  @media (min-width: 768px) {
    gap: 6px;
  }
`;

const ButtonIcon = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ButtonText = styled.div`
  font-size: 0.7rem;
  line-height: 1.1;

  @media (min-width: 480px) {
    font-size: 0.8rem;
  }

  @media (min-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.2;
  }
`;

const SelectionInfo = styled.div`
  margin-top: 15px;
  padding: 12px;
  background: rgba(0, 255, 136, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #00ff88;
  font-size: 0.8rem;
  text-align: center;

  @media (min-width: 768px) {
    margin-top: 20px;
    padding: 15px;
    font-size: 0.9rem;
    border-radius: 10px;
  }
`;

const QuickButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 12px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  @media (min-width: 768px) {
    gap: 10px;
    margin-top: 15px;
  }
`;

const QuickButton = styled.button`
  padding: 8px 6px;
  background: rgba(0, 255, 136, 0.2);
  border: 1px solid rgba(0, 255, 136, 0.4);
  color: #00ff88;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.7rem;
  transition: all 0.3s ease;
  font-weight: 600;

  @media (min-width: 480px) {
    padding: 8px 8px;
    font-size: 0.75rem;
  }

  @media (min-width: 768px) {
    padding: 8px 12px;
    font-size: 0.8rem;
    border-radius: 8px;
  }

  &:hover {
    background: rgba(0, 255, 136, 0.3);
    transform: scale(1.02);
  }
`;

const MetricSelector = ({
  selectedMetrics,
  onMetricsChange,
  selectedCountry = "world",
}) => {
  const toggleMetric = (metricKey) => {
    const updated = selectedMetrics.includes(metricKey)
      ? selectedMetrics.filter((m) => m !== metricKey)
      : [...selectedMetrics, metricKey];
    onMetricsChange(updated);
  };

  const selectAll = () => {
    onMetricsChange(Object.keys(WORLDOMETER_METRICS));
  };

  const selectEssential = () => {
    onMetricsChange(["currentPopulation", "birthsThisYear", "deathsThisYear"]);
  };

  const selectToday = () => {
    onMetricsChange(["currentPopulation", "birthsToday", "deathsToday"]);
  };

  const clearAll = () => {
    onMetricsChange([]);
  };

  return (
    <MetricSelectorContainer>
      <MetricLabel>📊 Statistiques :</MetricLabel>

      <ButtonGrid>
        {Object.entries(WORLDOMETER_METRICS).map(([key, metric]) => {
          const dynamicTitle = generateDynamicTitle(key, selectedCountry);
          const dynamicIcon = generateDynamicIcon(key, selectedCountry);

          const renderIcon = () => {
            if (dynamicIcon === "FLAG") {
              const country = COUNTRIES[selectedCountry];
              return (
                <Flag
                  countryCode={country?.countryCode || selectedCountry}
                  size="18px"
                />
              );
            } else {
              return dynamicIcon;
            }
          };

          return (
            <MetricButton
              key={key}
              selected={selectedMetrics.includes(key)}
              onClick={() => toggleMetric(key)}
            >
              <ButtonContent>
                <ButtonIcon>{renderIcon()}</ButtonIcon>
                <ButtonText>{dynamicTitle}</ButtonText>
              </ButtonContent>
            </MetricButton>
          );
        })}
      </ButtonGrid>

      <QuickButtons>
        <QuickButton onClick={selectEssential}>🎯 Essentiel</QuickButton>
        <QuickButton onClick={selectToday}>📅 Aujourd'hui</QuickButton>
        <QuickButton onClick={selectAll}>🌍 Tout</QuickButton>
        <QuickButton onClick={clearAll}>🧹 Vider</QuickButton>
      </QuickButtons>

      <SelectionInfo>
        ✅ {selectedMetrics.length} statistique
        {selectedMetrics.length > 1 ? "s" : ""} sélectionnée
        {selectedMetrics.length > 1 ? "s" : ""}
        {selectedMetrics.length === 0 &&
          " - Appuyez sur un bouton pour sélectionner"}
      </SelectionInfo>
    </MetricSelectorContainer>
  );
};

export default MetricSelector;
