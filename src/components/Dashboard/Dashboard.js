// src/components/Dashboard/Dashboard.js (Syntaxe corrigée)
import React from "react";
import { useCounters } from "../../hooks/useCounters";
import { usePreferences } from "../../hooks/usePreferences";
import WorldometerWidget from "../WorldometerWidget/WorldometerWidget";
import MetricSelector from "../MetricSelector/MetricSelector";
import CountrySelector from "../CountrySelector/CountrySelector";
import Flag from "../Flag/Flag";
import { WORLDOMETER_METRICS } from "../../data/metrics";
import { COUNTRIES } from "../../data/countries";
import styled from "styled-components";

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: ${(props) => (props.fullscreen ? "40px" : "20px")};
  background: #0a0a0a;
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
  `}
`;

const Header = styled.div`
  display: ${(props) => (props.fullscreen ? "none" : "block")};
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
  font-size: 3rem;
  text-shadow: 0 0 30px rgba(0, 255, 136, 0.4);
  font-weight: 900;
  letter-spacing: -1px;
`;

const Controls = styled.div`
  display: ${(props) => (props.fullscreen ? "none" : "flex")};
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ControlsWrapper = styled.div`
  background: rgba(26, 26, 26, 0.9);
  padding: 35px;
  border-radius: 20px;
  border: 2px solid #333;
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
`;

const FullscreenButton = styled.button`
  position: fixed;
  top: 25px;
  right: 25px;
  padding: 15px 25px;
  background: linear-gradient(135deg, #00ff88, #00cc70);
  color: #000;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  z-index: 1001;
  font-weight: 900;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 255, 136, 0.3);

  &:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 255, 136, 0.5);
  }
`;

const WidgetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => (props.fullscreen ? "500px" : "380px")}, 1fr)
  );
  gap: ${(props) => (props.fullscreen ? "40px" : "25px")};
  margin-top: 30px;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
`;

const LoadingMessage = styled.div`
  color: #fff;
  text-align: center;
  font-size: 2rem;
  margin-top: 100px;
  font-weight: 600;
`;

const CountryInfo = styled.div`
  text-align: center;
  margin-bottom: 30px;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
`;

const SyncInfo = styled.div`
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: rgba(26, 26, 26, 0.95);
  color: #00ff88;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 0.9rem;
  border: 2px solid rgba(0, 255, 136, 0.3);
  z-index: 1000;
  font-weight: 600;
  backdrop-filter: blur(10px);
`;

const Dashboard = () => {
  const [preferences, updatePreferences, isLoaded] = usePreferences();
  const { data, isLoading, error } = useCounters(preferences.selectedCountry);

  const toggleFullscreen = () => {
    updatePreferences({ fullscreenMode: !preferences.fullscreenMode });
  };

  // États de chargement
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

  // Vérification du pays
  const selectedCountryInfo = COUNTRIES[preferences.selectedCountry];
  if (!selectedCountryInfo) {
    console.error("Pays non trouvé:", preferences.selectedCountry);
    return (
      <DashboardContainer>
        <LoadingMessage>❌ Erreur: Pays non trouvé</LoadingMessage>
      </DashboardContainer>
    );
  }

  // Rendu principal
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
            ✅ Données temps réel synchronisées avec Worldometer
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

          return (
            <WorldometerWidget
              key={metricKey}
              metricKey={metricKey}
              value={value}
              title={metric.name}
              icon={metric.icon}
              fullscreen={preferences.fullscreenMode}
              countryCode={preferences.selectedCountry}
            />
          );
        })}

        {preferences.selectedMetrics.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#fff",
              fontSize: "1.5rem",
              padding: "50px",
              background: "rgba(255, 170, 0, 0.1)",
              borderRadius: "15px",
              border: "2px dashed rgba(255, 170, 0, 0.5)",
            }}
          >
            📊 Sélectionnez au moins une statistique pour commencer !
          </div>
        )}
      </WidgetsGrid>

      <SyncInfo>
        🔄 Sync Worldometer: {new Date().toLocaleTimeString()}
      </SyncInfo>
    </DashboardContainer>
  );
};

export default Dashboard;
