import React, { useState, useEffect } from "react";
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
import { dataService } from "../../services/dataService";

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

// 🔥 BOUTON BOTTOM-RIGHT - Simple et efficace
const FullscreenButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #00ff88, #00cc70);
  color: #000;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  z-index: 1001;
  font-weight: 800;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    padding: 14px 20px;
    font-size: 0.95rem;
    font-weight: 900;
  }

  @media (min-width: 1024px) {
    padding: 16px 24px;
    font-size: 1.1rem;
  }

  &:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.4);
  }

  &:active {
    transform: scale(0.98);
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

// 🔥 GRILLE OPTIMISÉE - SEULE MODIFICATION
const WidgetsGrid = styled.div`
  display: grid;
  gap: 15px;
  max-width: 1400px;
  margin: 0 auto;

  /* 🎯 LOGIQUE INTELLIGENTE selon le nombre de widgets */
  grid-template-columns: ${(props) => {
    const count = props.widgetCount || 0;

    // Si 1 seul widget = pleine largeur (comme avant)
    if (count === 1) {
      return "1fr";
    }

    // Si 2+ widgets = 2 colonnes maximum
    return "1fr"; // Mobile d'abord
  }};

  @media (min-width: 480px) {
    gap: 18px;
    grid-template-columns: ${(props) => {
      const count = props.widgetCount || 0;
      if (count === 1) return "1fr";
      return "repeat(auto-fit, minmax(280px, 1fr))";
    }};
  }

  @media (min-width: 768px) {
    gap: 20px;
    grid-template-columns: ${(props) => {
      const count = props.widgetCount || 0;

      // 1 widget = prend toute la largeur disponible
      if (count === 1) {
        return "1fr";
      }

      // 2+ widgets = exactement 2 colonnes, plus larges
      return "repeat(2, 1fr)";
    }};

    /* 🎯 LARGEUR OPTIMISÉE pour 2 colonnes rectangulaires */
    max-width: ${(props) => {
      const count = props.widgetCount || 0;
      if (count === 1) return "800px"; // Widget unique plus large
      return "1200px"; // 2 colonnes spacieuses
    }};
  }

  @media (min-width: 1024px) {
    gap: ${(props) => (props.fullscreen ? "25px" : "22px")};

    /* 🎯 ENCORE PLUS LARGE en plein écran */
    max-width: ${(props) => {
      const count = props.widgetCount || 0;
      if (count === 1) return props.fullscreen ? "900px" : "800px";
      return props.fullscreen ? "1400px" : "1200px";
    }};
  }

  @media (min-width: 1400px) {
    gap: ${(props) => (props.fullscreen ? "30px" : "25px")};

    max-width: ${(props) => {
      const count = props.widgetCount || 0;
      if (count === 1) return props.fullscreen ? "1000px" : "900px";
      return props.fullscreen ? "1600px" : "1400px";
    }};
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

const CalibrationInfo = styled.div`
  color: #ffb86b;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 8px;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 1rem;
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
  const [calInfo, setCalInfo] = useState(null);

  const toggleFullscreen = () => {
    updatePreferences({ fullscreenMode: !preferences.fullscreenMode });
  };

  useEffect(() => {
    let mounted = true;

    const refresh = () => {
      try {
        const info = dataService.getCalibrationInfo(
          preferences.selectedCountry
        );
        if (!mounted) return;
        if (info && info.ts) {
          setCalInfo({
            source: info.source || "official",
            ts: info.ts,
            value: info.value || null,
          });
        } else {
          setCalInfo(null);
        }
      } catch (e) {
        if (!mounted) return;
        setCalInfo(null);
      }
    };

    refresh();
    const id = setInterval(refresh, 5000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [preferences.selectedCountry]);

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
        <Title>🌍 HumanSpam 🐛</Title>
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
        {!preferences.fullscreenMode && (
          <CalibrationInfo>
            Source:{" "}
            <strong>
              {calInfo?.source ? calInfo.source : "Estimation locale"}
            </strong>
          </CalibrationInfo>
        )}
      </Header>

      {preferences.fullscreenMode && (
        <CountryInfo>
          <h2>
            <Flag countryCode={selectedCountryInfo.countryCode} size="32px" />
            {selectedCountryInfo.name}
          </h2>
          <div className="status">✅ Données temps réel</div>
          <CalibrationInfo>
            Source:{" "}
            <strong>
              {calInfo?.source ? calInfo.source : "Estimation locale"}
            </strong>
          </CalibrationInfo>
        </CountryInfo>
      )}

      {/* 🎯 PASSE LE NOMBRE DE WIDGETS à la grille */}
      <WidgetsGrid
        fullscreen={preferences.fullscreenMode}
        widgetCount={preferences.selectedMetrics.length}
      >
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
