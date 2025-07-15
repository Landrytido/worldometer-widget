import React from "react";
import { useCounters } from "../../hooks/useCounters";
import { usePreferences } from "../../hooks/usePreferences";
import CounterWidget from "../CounterWidget/CounterWidget";
import MetricSelector from "../MetricSelector/MetricSelector";
import CountrySelector from "../CountrySelector/CountrySelector";
import { METRICS } from "../../data/metrics";
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
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
`;

const Controls = styled.div`
  display: ${(props) => (props.fullscreen ? "none" : "flex")};
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 30px;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ControlsWrapper = styled.div`
  background: rgba(26, 26, 26, 0.8);
  padding: 30px;
  border-radius: 15px;
  border: 2px solid #333;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const FullscreenButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  background: #00ff88;
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1001;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #00cc70;
    transform: scale(1.05);
  }
`;

const CountersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => (props.fullscreen ? "400px" : "300px")}, 1fr)
  );
  gap: ${(props) => (props.fullscreen ? "30px" : "20px")};
  margin-top: 20px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const LoadingMessage = styled.div`
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 50px;
`;

const CountryInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  font-size: 1.2rem;
`;

const Dashboard = () => {
  const [preferences, updatePreferences, isLoaded] = usePreferences();
  const { data, isLoading, error } = useCounters(preferences.selectedCountry);

  const toggleFullscreen = () => {
    updatePreferences({ fullscreenMode: !preferences.fullscreenMode });
  };

  // Attendre que les préférences soient chargées
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
          🌍 Récupération des données Population.io...
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

  if (!data) {
    return (
      <DashboardContainer>
        <LoadingMessage>🔄 Chargement des données...</LoadingMessage>
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
            />
          </Controls>
        </ControlsWrapper>
      </Header>

      {preferences.fullscreenMode && (
        <CountryInfo>
          <h2>
            {selectedCountryInfo.flag} {selectedCountryInfo.name}
          </h2>
          {data.isRealData ? (
            <div
              style={{ fontSize: "0.9rem", color: "#00ff88", marginTop: "5px" }}
            >
              ✅ Données temps réel Population.io
            </div>
          ) : (
            <div
              style={{ fontSize: "0.9rem", color: "#ffaa00", marginTop: "5px" }}
            >
              ⚠️ Données de fallback (API indisponible)
            </div>
          )}
        </CountryInfo>
      )}

      <CountersGrid fullscreen={preferences.fullscreenMode}>
        {preferences.selectedMetrics.map((metricKey) => {
          const metric = METRICS[metricKey];
          let value = data[metricKey];

          // Formater la valeur selon le type
          if (
            metricKey === "births" ||
            metricKey === "deaths" ||
            metricKey === "growth"
          ) {
            value = value.toFixed(1);
          }

          return (
            <CounterWidget
              key={metricKey}
              type={metricKey}
              value={value}
              label={metric.name + (metricKey !== "population" ? "/sec" : "")}
              message={metric.message}
              icon={metric.icon}
              fullscreen={preferences.fullscreenMode}
            />
          );
        })}
      </CountersGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
