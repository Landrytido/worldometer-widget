// src/components/CounterWidget/CounterWidget.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDynamicMessage } from "../../data/metrics";

const CounterContainer = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  padding: ${(props) => (props.fullscreen ? "40px" : "24px")};
  margin: 12px;
  text-align: center;
  border: 2px solid #333;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff88;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.2);
  }
`;

const CounterLabel = styled.div`
  font-size: ${(props) => (props.fullscreen ? "1.5rem" : "1.2rem")};
  color: #fff;
  margin-bottom: 12px;
  font-weight: 600;
`;

const MainValue = styled.div`
  font-size: ${(props) => (props.fullscreen ? "4rem" : "3rem")};
  font-weight: bold;
  color: #00ff88;
  margin: 12px 0;
  font-family: "Courier New", monospace;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  line-height: 1.1;
`;

const HybridStats = styled.div`
  margin: 16px 0;
  padding: 12px;
  background: rgba(0, 255, 136, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 136, 0.3);
`;

const StatLine = styled.div`
  font-size: ${(props) => (props.fullscreen ? "1.1rem" : "0.95rem")};
  color: #fff;
  margin: 6px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatLabel = styled.span`
  color: #ccc;
`;

const StatValue = styled.span`
  color: #00ff88;
  font-weight: bold;
  font-family: "Courier New", monospace;
`;

const SarcasticMessage = styled.div`
  font-size: ${(props) => (props.fullscreen ? "1.1rem" : "0.9rem")};
  color: #ffaa00;
  font-style: italic;
  margin-top: 16px;
  line-height: 1.4;
  word-wrap: break-word;
  hyphens: auto;
  min-height: ${(props) => (props.fullscreen ? "2.2rem" : "1.8rem")};
`;

const CounterWidget = ({
  type,
  value,
  label,
  message,
  icon,
  fullscreen = false,
  countryCode = "world",
  hybridData = null,
}) => {
  const [currentMessage, setCurrentMessage] = useState(message);

  // Changer le message toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = getDynamicMessage(type, countryCode);
      setCurrentMessage(newMessage);
    }, 5000);

    return () => clearInterval(interval);
  }, [type, countryCode]);

  const formatNumber = (num) => {
    if (typeof num === "string") return num;
    return new Intl.NumberFormat("fr-FR").format(Math.floor(num));
  };

  const formatLargeNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return formatNumber(num);
  };

  // Rendu spécial pour la population (mode hybride complet)
  if (type === "population" && hybridData) {
    return (
      <CounterContainer fullscreen={fullscreen}>
        <CounterLabel fullscreen={fullscreen}>
          {icon} {label}
        </CounterLabel>
        <MainValue fullscreen={fullscreen}>{formatNumber(value)}</MainValue>

        <HybridStats>
          <StatLine fullscreen={fullscreen}>
            <StatLabel>📅 Aujourd'hui:</StatLabel>
            <StatValue>
              +{formatNumber(hybridData.birthsToday)} naissances
            </StatValue>
          </StatLine>
          <StatLine fullscreen={fullscreen}>
            <StatLabel></StatLabel>
            <StatValue>-{formatNumber(hybridData.deathsToday)} décès</StatValue>
          </StatLine>
          <StatLine fullscreen={fullscreen}>
            <StatLabel>📊 Cette année:</StatLabel>
            <StatValue>
              +{formatLargeNumber(hybridData.birthsThisYear)} naissances
            </StatValue>
          </StatLine>
          <StatLine fullscreen={fullscreen}>
            <StatLabel>⚡ Croissance/sec:</StatLabel>
            <StatValue>+{hybridData.growthPerSecond.toFixed(1)}</StatValue>
          </StatLine>
        </HybridStats>

        <SarcasticMessage fullscreen={fullscreen}>
          {currentMessage}
        </SarcasticMessage>
      </CounterContainer>
    );
  }

  // Rendu hybride pour naissances/décès
  if ((type === "births" || type === "deaths") && hybridData) {
    const todayKey = type === "births" ? "birthsToday" : "deathsToday";
    const yearKey = type === "births" ? "birthsThisYear" : "deathsThisYear";
    const projectedKey =
      type === "births" ? "projectedBirthsFullDay" : "projectedDeathsFullDay";

    return (
      <CounterContainer fullscreen={fullscreen}>
        <CounterLabel fullscreen={fullscreen}>
          {icon} {label}
        </CounterLabel>
        <MainValue fullscreen={fullscreen}>{formatNumber(value)}/sec</MainValue>

        <HybridStats>
          <StatLine fullscreen={fullscreen}>
            <StatLabel>📅 Aujourd'hui:</StatLabel>
            <StatValue>{formatNumber(hybridData[todayKey])}</StatValue>
          </StatLine>
          <StatLine fullscreen={fullscreen}>
            <StatLabel>🎯 Projection 24h:</StatLabel>
            <StatValue>{formatNumber(hybridData[projectedKey])}</StatValue>
          </StatLine>
          <StatLine fullscreen={fullscreen}>
            <StatLabel>📊 Cette année:</StatLabel>
            <StatValue>{formatLargeNumber(hybridData[yearKey])}</StatValue>
          </StatLine>
        </HybridStats>

        <SarcasticMessage fullscreen={fullscreen}>
          {currentMessage}
        </SarcasticMessage>
      </CounterContainer>
    );
  }

  // Rendu hybride pour croissance
  if (type === "growth" && hybridData) {
    return (
      <CounterContainer fullscreen={fullscreen}>
        <CounterLabel fullscreen={fullscreen}>
          {icon} {label}
        </CounterLabel>
        <MainValue fullscreen={fullscreen}>
          +{formatNumber(value)}/sec
        </MainValue>

        <HybridStats>
          <StatLine fullscreen={fullscreen}>
            <StatLabel>📅 Croissance aujourd'hui:</StatLabel>
            <StatValue>+{formatNumber(hybridData.growthToday)}</StatValue>
          </StatLine>
          <StatLine fullscreen={fullscreen}>
            <StatLabel>🎯 Projection 24h:</StatLabel>
            <StatValue>
              +{formatNumber(hybridData.projectedGrowthFullDay)}
            </StatValue>
          </StatLine>
          <StatLine fullscreen={fullscreen}>
            <StatLabel>📊 Croissance cette année:</StatLabel>
            <StatValue>
              +{formatLargeNumber(hybridData.growthThisYear)}
            </StatValue>
          </StatLine>
        </HybridStats>

        <SarcasticMessage fullscreen={fullscreen}>
          {currentMessage}
        </SarcasticMessage>
      </CounterContainer>
    );
  }

  // Rendu par défaut (fallback)
  return (
    <CounterContainer fullscreen={fullscreen}>
      <CounterLabel fullscreen={fullscreen}>
        {icon} {label}
      </CounterLabel>
      <MainValue fullscreen={fullscreen}>{formatNumber(value)}</MainValue>
      <SarcasticMessage fullscreen={fullscreen}>
        {currentMessage}
      </SarcasticMessage>
    </CounterContainer>
  );
};

export default CounterWidget;
