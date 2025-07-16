import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDynamicMessage } from "../../data/metrics";

const WidgetContainer = styled.div`
  background: #1a1a1a;
  border-radius: 15px;
  padding: ${(props) => (props.fullscreen ? "50px 40px" : "35px 30px")};
  margin: 15px;
  text-align: center;
  border: 2px solid #333;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #00ff88;
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(0, 255, 136, 0.25);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ff88, #00cc70, #00ff88);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const WidgetIcon = styled.div`
  font-size: ${(props) => (props.fullscreen ? "3rem" : "2.5rem")};
  margin-bottom: 15px;
  filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.3));
`;

const WidgetTitle = styled.h3`
  font-size: ${(props) => (props.fullscreen ? "1.8rem" : "1.4rem")};
  color: #fff;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  line-height: 1.3;
`;

const MainValue = styled.div`
  font-size: ${(props) => (props.fullscreen ? "5.5rem" : "4.5rem")};
  font-weight: 900;
  color: #00ff88;
  margin: 25px 0;
  font-family: "Courier New", monospace;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
  line-height: 1;
  letter-spacing: -2px;
`;

const ValueLabel = styled.div`
  font-size: ${(props) => (props.fullscreen ? "1.3rem" : "1.1rem")};
  color: #ccc;
  margin-bottom: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SarcasticMessage = styled.div`
  font-size: ${(props) => (props.fullscreen ? "1.4rem" : "1.2rem")};
  color: #ffaa00;
  font-style: italic;
  margin-top: 25px;
  line-height: 1.4;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(255, 170, 0, 0.3);
  padding: 15px;
  background: rgba(255, 170, 0, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(255, 170, 0, 0.2);
  min-height: ${(props) => (props.fullscreen ? "4rem" : "3.5rem")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedCounter = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;

  &.updating {
    transform: scale(1.05);
  }
`;

const WorldometerWidget = ({
  metricKey,
  value,
  title,
  icon,
  fullscreen = false,
  countryCode = "world",
}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastValue, setLastValue] = useState(value);

  // Animation quand la valeur change
  useEffect(() => {
    if (value !== lastValue) {
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 300);
      setLastValue(value);
    }
  }, [value, lastValue]);

  // Changer le message toutes les 6 secondes
  useEffect(() => {
    // Message initial
    const initialMessage = getDynamicMessage(metricKey, countryCode);
    setCurrentMessage(initialMessage);

    // Intervalle pour changer le message
    const interval = setInterval(() => {
      const newMessage = getDynamicMessage(metricKey, countryCode);
      setCurrentMessage(newMessage);
    }, 6000);

    return () => clearInterval(interval);
  }, [metricKey, countryCode]);

  const formatNumber = (num) => {
    if (typeof num === "string") return num;
    return new Intl.NumberFormat("fr-FR").format(Math.floor(num));
  };

  return (
    <WidgetContainer fullscreen={fullscreen}>
      <WidgetIcon fullscreen={fullscreen}>{icon}</WidgetIcon>

      <WidgetTitle fullscreen={fullscreen}>{title}</WidgetTitle>

      <MainValue fullscreen={fullscreen}>
        <AnimatedCounter className={isUpdating ? "updating" : ""}>
          {formatNumber(value)}
        </AnimatedCounter>
      </MainValue>

      <SarcasticMessage fullscreen={fullscreen}>
        {currentMessage}
      </SarcasticMessage>
    </WidgetContainer>
  );
};

export default WorldometerWidget;
