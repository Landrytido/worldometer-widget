import React from "react";
import { useCounters } from "../../hooks/useCounters";
import { usePreferences } from "../../hooks/usePreferences";
import WorldometerWidget from "../WorldometerWidget/WorldometerWidget";
import MetricSelector from "../MetricSelector/MetricSelector";
import CountrySelector from "../CountrySelector/CountrySelector";
import Flag from "../Flag/Flag";
import { WORLDOMETER_METRICS } from "../../data/metrics";
import { COUNTRIES } from "../../data/countries";
import {
  generateDynamicTitle,
  generateDynamicIcon,
} from "../../utils/titleGenerator";
import styled from "styled-components";

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 16px;
  background: #0a0a0a;

  @media (min-width: 768px) {
    padding: 20px;
  }

  ${(props) =>
    props.fullscreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    overflow-y: auto;
    padding: 20px;
  `}
`;

const Header = styled.div`
  display: ${(props) => (props.fullscreen ? "none" : "block")};
  margin-bottom: 30px;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  text-shadow: 0 0 30px rgba(0, 255, 136, 0.4);
  font-weight: 900;
  letter-spacing: -1px;

  @media (min-width: 768px) {
    font-size: 3rem;
    margin-bottom: 40px;
  }
`;

const Controls = styled.div`
  display: ${(props) => (props.fullscreen ? "none" : "flex")};
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
    gap: 30px;
    margin-bottom: 40px;
  }
`;

const ControlsWrapper = styled.div`
  background: rgba(26, 26, 26, 0.9);
  padding: 20px;
  border-radius: 15px;
  border: 2px solid #333;
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  width: 100%;
  max-width: 1200px;

  @media (min-width: 768px) {
    padding: 25px;
  }
`;

const FullscreenButton = styled.button`
  position: fixed;
  top: 15px;
  right: 15px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #00ff88, #00cc70);
  color: #000;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1001;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 255, 136, 0.3);

  @media (min-width: 768px) {
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    font-size: 1rem;
  }

  &:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 255, 136, 0.5);
  }
`;

const WidgetsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    margin-top: 30px;
  }

  ${(props) =>
    props.fullscreen &&
    `
    gap: 30px;
    margin-top: 20px;
    
    @media (min-width: 768px) {
      gap: 40px;
    }
  `}
`;

const LoadingMessage = styled.div`
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 80px;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-top: 100px;
  }
`;

const CountryInfo = styled.div`
  text-align: center;
  margin-bottom: 25px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 30px;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: #fff;
  font-size: 1.2rem;
  padding: 40px 20px;
  background: rgba(255, 170, 0, 0.1);
  border-radius: 15px;
  border: 2px dashed rgba(255, 170, 0, 0.5);

  @media (min-width: 768px) {
    font-size: 1.5rem;
    padding: 50px;
  }
`;

const Dashboard = () => {
  const [preferences, updatePreferences, isLoaded] = usePreferences();
  const { data, isLoading, error } = useCounters(preferences.selectedCountry);

  const toggleFullscreen = () => {
    updatePreferences({ fullscreenMode: !preferences.fullscreenMode });
  };

  if (!isLoaded) {
    return (
      <DashboardContainer>
        <LoadingMessage>⚙️ Chargement des préférences...</LoadingMessage>
      </DashboardContainer>
    );
  }

  if (isLoading) {
    return (
      <DashboardContainer>
        <LoadingMessage>
          🌍 Synchronisation Worldometer en cours...
        </LoadingMessage>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <LoadingMessage>❌ Erreur: {error}</LoadingMessage>
      </DashboardContainer>
    );
  }

  if (!data || !data.worldometer) {
    return (
      <DashboardContainer>
        <LoadingMessage>🔄 Préparation des données...</LoadingMessage>
      </DashboardContainer>
    );
  }

  const selectedCountryInfo = COUNTRIES[preferences.selectedCountry];
  if (!selectedCountryInfo) {
    console.error("Pays non trouvé:", preferences.selectedCountry);
    return (
      <DashboardContainer>
        <LoadingMessage>❌ Erreur: Pays non trouvé</LoadingMessage>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer fullscreen={preferences.fullscreenMode}>
      <FullscreenButton onClick={toggleFullscreen}>
        {preferences.fullscreenMode ? "🔙 Sortir" : "🔳 Plein écran"}
      </FullscreenButton>

      <Header fullscreen={preferences.fullscreenMode}>
        <Title>🌍 Worldometer Widget</Title>
        <ControlsWrapper>
          <Controls fullscreen={preferences.fullscreenMode}>
            <CountrySelector
              selectedCountry={preferences.selectedCountry}
              onCountryChange={(country) =>
                updatePreferences({ selectedCountry: country })
              }
            />

            <MetricSelector
              selectedMetrics={preferences.selectedMetrics}
              onMetricsChange={(metrics) =>
                updatePreferences({ selectedMetrics: metrics })
              }
              selectedCountry={preferences.selectedCountry}
            />
          </Controls>
        </ControlsWrapper>
      </Header>

      {preferences.fullscreenMode && (
        <CountryInfo>
          <h2>
            <Flag countryCode={selectedCountryInfo.countryCode} size="32px" />
            {selectedCountryInfo.name}
          </h2>
          <div style={{ fontSize: "1rem", color: "#00ff88", marginTop: "8px" }}>
            ✅ Données temps réel synchronisées
          </div>
        </CountryInfo>
      )}

      <WidgetsGrid fullscreen={preferences.fullscreenMode}>
        {preferences.selectedMetrics.map((metricKey) => {
          const metric = WORLDOMETER_METRICS[metricKey];
          const value = data.worldometer[metricKey];

          if (!metric || value === undefined) {
            console.warn(`Métrique non trouvée: ${metricKey}`);
            return null;
          }

          const dynamicTitle = generateDynamicTitle(
            metricKey,
            preferences.selectedCountry
          );
          const dynamicIcon = generateDynamicIcon(
            metricKey,
            preferences.selectedCountry
          );
          const finalIcon = dynamicIcon === "FLAG" ? metric.icon : dynamicIcon;

          return (
            <WorldometerWidget
              key={metricKey}
              metricKey={metricKey}
              value={value}
              title={dynamicTitle}
              icon={finalIcon}
              fullscreen={preferences.fullscreenMode}
              countryCode={preferences.selectedCountry}
            />
          );
        })}

        {preferences.selectedMetrics.length === 0 && (
          <EmptyState>
            📊 Sélectionnez au moins une statistique pour commencer !
          </EmptyState>
        )}
      </WidgetsGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
