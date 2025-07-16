// MetricSelector.js - Version Mobile Collapsible
import React, { useState, useEffect } from "react";
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
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    margin: 20px 0;
    padding: 25px;
    border-radius: 15px;
    min-width: 350px;
  }
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.isExpanded ? "15px" : "0")};
  transition: margin-bottom 0.3s ease;

  @media (min-width: 768px) {
    margin-bottom: ${(props) => (props.isExpanded ? "20px" : "0")};
  }
`;

const MetricLabel = styled.div`
  color: #00ff88;
  font-weight: 700;
  font-size: 1rem;
  text-shadow: 0 0 5px rgba(0, 255, 136, 0.3);

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

// 🔥 NOUVEAU : Bouton pour expand/collapse sur mobile
const ExpandButton = styled.button`
  background: rgba(0, 255, 136, 0.2);
  border: 1px solid rgba(0, 255, 136, 0.4);
  color: #00ff88;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  @media (min-width: 768px) {
    display: none; /* Caché sur desktop */
  }

  &:hover {
    background: rgba(0, 255, 136, 0.3);
    transform: scale(1.02);
  }

  .arrow {
    transition: transform 0.3s ease;
    transform: ${(props) =>
      props.isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;

// 🔥 CONTENU COLLAPSIBLE
const CollapsibleContent = styled.div`
  overflow: hidden;
  transition: all 0.3s ease;

  /* Mobile : Contrôlé par isExpanded */
  max-height: ${(props) => {
    if (window.innerWidth >= 768) return "none"; // Desktop toujours ouvert
    return props.isExpanded ? "800px" : "0px"; // Mobile contrôlé
  }};

  opacity: ${(props) => {
    if (window.innerWidth >= 768) return "1"; // Desktop toujours visible
    return props.isExpanded ? "1" : "0"; // Mobile contrôlé
  }};

  @media (min-width: 768px) {
    /* Desktop : toujours visible */
    max-height: none !important;
    opacity: 1 !important;
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  }

  @media (min-width: 768px) {
    gap: 15px;
    margin-bottom: 15px;
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

const QuickButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  @media (min-width: 768px) {
    gap: 10px;
    margin-bottom: 15px;
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

const SelectionInfo = styled.div`
  padding: 12px;
  background: rgba(0, 255, 136, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #00ff88;
  font-size: 0.8rem;
  text-align: center;

  @media (min-width: 768px) {
    padding: 15px;
    font-size: 0.9rem;
    border-radius: 10px;
  }
`;

const MetricSelector = ({
  selectedMetrics,
  onMetricsChange,
  selectedCountry = "world",
}) => {
  // 🔥 ÉTAT pour contrôler l'expansion (mobile uniquement)
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 🔥 DÉTECTION de la taille d'écran
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Sur desktop, toujours expanded
      if (!mobile) {
        setIsExpanded(true);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 🔥 AUTO-COLLAPSE après sélection sur mobile
  const handleMetricChange = (metrics) => {
    onMetricsChange(metrics);

    // Sur mobile, se ferme automatiquement après sélection
    if (isMobile && metrics.length > 0) {
      setTimeout(() => setIsExpanded(false), 500);
    }
  };

  const toggleMetric = (metricKey) => {
    const updated = selectedMetrics.includes(metricKey)
      ? selectedMetrics.filter((m) => m !== metricKey)
      : [...selectedMetrics, metricKey];
    handleMetricChange(updated);
  };

  const selectAll = () => handleMetricChange(Object.keys(WORLDOMETER_METRICS));
  const selectEssential = () =>
    handleMetricChange([
      "currentPopulation",
      "birthsThisYear",
      "deathsThisYear",
    ]);
  const selectToday = () =>
    handleMetricChange(["currentPopulation", "birthsToday", "deathsToday"]);
  const clearAll = () => handleMetricChange([]);

  return (
    <MetricSelectorContainer>
      <MetricHeader isExpanded={isExpanded}>
        <MetricLabel>📊 Statistiques :</MetricLabel>

        {/* 🔥 BOUTON EXPAND/COLLAPSE (mobile uniquement) */}
        {isMobile && (
          <ExpandButton
            isExpanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Masquer" : "Choisir"}
            <span className="arrow">▼</span>
          </ExpandButton>
        )}
      </MetricHeader>

      {/* 🔥 CONTENU COLLAPSIBLE */}
      <CollapsibleContent isExpanded={isExpanded}>
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
      </CollapsibleContent>
    </MetricSelectorContainer>
  );
};

export default MetricSelector;
