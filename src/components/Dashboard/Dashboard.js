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
  background: #0a0a0a;
  padding: ${(props) => (props.fullscreen ? "0" : "10px")};

  @media (min-width: 768px) {
    padding: ${(props) => (props.fullscreen ? "20px" : "20px")};
  }
`;

const Header = styled.div`
  display: ${(props) => (props.fullscreen ? "none" : "block")};
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
  font-weight: 900;
  letter-spacing: -0.5px;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }

  @media (min-width: 1200px) {
    font-size: 3rem;
    margin-bottom: 40px;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
  }
`;

const ControlsWrapper = styled.div`
  background: rgba(26, 26, 26, 0.95);
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #333;
  backdrop-filter: blur(10px);

  @media (min-width: 768px) {
    padding: 25px;
    border-radius: 20px;
    border: 2px solid #333;
  }
`;

const FullscreenButton = styled.button`
  position: fixed;
  top: 15px;
  right: 15px;
  padding: 12px 18px;
  background: linear-gradient(135deg, #00ff88, #00cc70);
  color: #000;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  z-index: 1001;
  font-weight: 900;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    font-size: 1.1rem;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(0, 255, 136, 0.4);
  }
`;

const WidgetsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(${(props) => (props.fullscreen ? "400px" : "360px")}, 1fr)
    );
    gap: ${(props) => (props.fullscreen ? "25px" : "22px")};
  }

  @media (min-width: 1400px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(${(props) => (props.fullscreen ? "450px" : "380px")}, 1fr)
    );
    gap: ${(props) => (props.fullscreen ? "30px" : "25px")};
  }
`;

const LoadingMessage = styled.div`
  color: #fff;
  text-align: center;
  font-size: 1.3rem;
  margin-top: 50px;
  font-weight: 600;
  padding: 20px;

  @media (min-width: 768px) {
    font-size: 1.8rem;
    margin-top: 100px;
  }
`;

const CountryInfo = styled.div`
  text-align: center;
  margin: 20px 0;
  color: #fff;

  h2 {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .status {
    font-size: 0.9rem;
    color: #00ff88;
  }

  @media (min-width: 768px) {
    margin: 30px 0;

    h2 {
      font-size: 1.6rem;
    }

    .status {
      font-size: 1rem;
    }
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: #fff;
  font-size: 1.1rem;
  padding: 30px 20px;
  background: rgba(255, 170, 0, 0.1);
  border-radius: 15px;
  border: 2px dashed rgba(255, 170, 0, 0.5);

  @media (min-width: 768px) {
    font-size: 1.3rem;
    padding: 40px;
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
        <LoadingMessage>⚙️ Chargement...</LoadingMessage>
      </DashboardContainer>
    );
  }

  if (isLoading) {
    return (
      <DashboardContainer>
        <LoadingMessage>🌍 Synchronisation...</LoadingMessage>
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
        <LoadingMessage>🔄 Préparation...</LoadingMessage>
      </DashboardContainer>
    );
  }

  const selectedCountryInfo = COUNTRIES[preferences.selectedCountry];
  if (!selectedCountryInfo) {
    return (
      <DashboardContainer>
        <LoadingMessage>❌ Pays non trouvé</LoadingMessage>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer fullscreen={preferences.fullscreenMode}>
      <FullscreenButton onClick={toggleFullscreen}>
        {preferences.fullscreenMode ? "🔙 Normal" : "🔳 Plein écran"}
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
          <div className="status">✅ Données temps réel</div>
        </CountryInfo>
      )}

      <WidgetsGrid fullscreen={preferences.fullscreenMode}>
        {preferences.selectedMetrics.map((metricKey) => {
          const metric = WORLDOMETER_METRICS[metricKey];
          const value = data.worldometer[metricKey];

          if (!metric || value === undefined) {
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
            📊 Sélectionnez des statistiques dans le menu !
          </EmptyState>
        )}
      </WidgetsGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
