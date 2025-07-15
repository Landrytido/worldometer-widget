import React from "react";
import styled from "styled-components";

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

const CounterValue = styled.div`
  font-size: ${(props) => (props.fullscreen ? "4rem" : "3rem")};
  font-weight: bold;
  color: #00ff88;
  margin: 12px 0;
  font-family: "Courier New", monospace;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
`;

const CounterLabel = styled.div`
  font-size: ${(props) => (props.fullscreen ? "1.5rem" : "1.2rem")};
  color: #fff;
  margin-bottom: 8px;
  font-weight: 600;
`;

const SarcasticMessage = styled.div`
  font-size: ${(props) => (props.fullscreen ? "1.1rem" : "0.9rem")};
  color: #ffaa00;
  font-style: italic;
  margin-top: 12px;
  line-height: 1.4;
  word-wrap: break-word;
  hyphens: auto;
`;

const CounterWidget = ({
  type,
  value,
  label,
  message,
  icon,
  fullscreen = false,
}) => {
  const formatNumber = (num) => {
    if (typeof num === "string") return num;
    return new Intl.NumberFormat("fr-FR").format(Math.floor(num));
  };

  return (
    <CounterContainer fullscreen={fullscreen}>
      <CounterLabel fullscreen={fullscreen}>
        {icon} {label}
      </CounterLabel>
      <CounterValue fullscreen={fullscreen}>{formatNumber(value)}</CounterValue>
      <SarcasticMessage fullscreen={fullscreen}>{message}</SarcasticMessage>
    </CounterContainer>
  );
};

export default CounterWidget;
