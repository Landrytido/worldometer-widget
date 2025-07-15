import React from "react";
import styled from "styled-components";
import { METRICS } from "../../data/metrics";

const SelectorContainer = styled.div`
  margin: 20px 0;
  background: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #333;
  min-width: 300px;
`;

const Label = styled.div`
  color: #00ff88;
  margin-bottom: 15px;
  font-weight: 700;
  font-size: 1.1rem;
  text-shadow: 0 0 5px rgba(0, 255, 136, 0.3);
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const MetricButton = styled.button`
  padding: 15px 25px;
  border: 2px solid ${(props) => (props.selected ? "#00ff88" : "#333")};
  background: ${(props) => (props.selected ? "#00ff88" : "#0a0a0a")};
  color: ${(props) => (props.selected ? "#000" : "#fff")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  font-size: 1rem;

  &:hover {
    border-color: #00ff88;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MetricSelector = ({ selectedMetrics, onMetricsChange }) => {
  const toggleMetric = (metricKey) => {
    const updated = selectedMetrics.includes(metricKey)
      ? selectedMetrics.filter((m) => m !== metricKey)
      : [...selectedMetrics, metricKey];
    onMetricsChange(updated);
  };

  return (
    <SelectorContainer>
      <Label>📊 Sélectionner les métriques :</Label>
      <ButtonGrid>
        {Object.entries(METRICS).map(([key, metric]) => (
          <MetricButton
            key={key}
            selected={selectedMetrics.includes(key)}
            onClick={() => toggleMetric(key)}
          >
            {metric.icon} {metric.name}
          </MetricButton>
        ))}
      </ButtonGrid>
    </SelectorContainer>
  );
};

export default MetricSelector;
