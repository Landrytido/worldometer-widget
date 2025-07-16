// src/components/MetricSelector/MetricSelector.js - Avec titres ET icônes dynamiques
import React from "react";
import styled from "styled-components";
import { WORLDOMETER_METRICS } from "../../data/metrics";
import {
  generateDynamicTitle,
  generateDynamicIcon,
} from "../../utils/titleGenerator";
import { COUNTRIES } from "../../data/countries";
import Flag from "../Flag/Flag";

const SelectorContainer = styled.div`
  margin: 20px 0;
  background: #1a1a1a;
  padding: 25px;
  border-radius: 15px;
  border: 2px solid #333;
  min-width: 350px;
`;

const Label = styled.div`
  color: #00ff88;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 1.2rem;
  text-shadow: 0 0 5px rgba(0, 255, 136, 0.3);
  text-align: center;
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

const MetricButton = styled.button`
  padding: 18px 25px;
  border: 2px solid ${(props) => (props.selected ? "#00ff88" : "#444")};
  background: ${(props) => (props.selected ? "#00ff88" : "#0a0a0a")};
  color: ${(props) => (props.selected ? "#000" : "#fff")};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  font-size: 1rem;
  min-width: 160px;
  text-align: center;

  &:hover {
    border-color: #00ff88;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 255, 136, 0.3);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const ButtonIcon = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.div`
  font-size: 0.9rem;
  line-height: 1.2;
`;

const SelectionInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: rgba(0, 255, 136, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #00ff88;
  font-size: 0.9rem;
  text-align: center;
`;

const QuickButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  justify-content: center;
`;

const QuickButton = styled.button`
  padding: 8px 15px;
  background: rgba(0, 255, 136, 0.2);
  border: 1px solid rgba(0, 255, 136, 0.4);
  color: #00ff88;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 136, 0.3);
  }
`;

const MetricSelector = ({
  selectedMetrics,
  onMetricsChange,
  selectedCountry = "world", // 🆕 Nouvelle prop pour le pays
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
    <SelectorContainer>
      <Label>📊 Sélectionner les statistiques :</Label>

      <ButtonGrid>
        {Object.entries(WORLDOMETER_METRICS).map(([key, metric]) => {
          // 🎯 TITRE ET ICÔNE DYNAMIQUES
          const dynamicTitle = generateDynamicTitle(key, selectedCountry);
          const dynamicIcon = generateDynamicIcon(key, selectedCountry);

          // 🔥 Rendu de l'icône (drapeau ou émoji)
          const renderIcon = () => {
            if (dynamicIcon === "FLAG") {
              // Utiliser le drapeau du pays
              const country = COUNTRIES[selectedCountry];
              return (
                <Flag
                  countryCode={country?.countryCode || selectedCountry}
                  size="24px"
                />
              );
            } else {
              // Utiliser l'icône normale (🌍, 👶, 💀, etc.)
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
                <ButtonText>{dynamicTitle}</ButtonText>{" "}
                {/* ✅ Titre adapté au pays */}
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
          " - Sélectionnez au moins une statistique"}
      </SelectionInfo>
    </SelectorContainer>
  );
};

export default MetricSelector;
