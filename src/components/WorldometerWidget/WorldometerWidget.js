import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDynamicMessage } from "../../data/metrics";
import Flag from "../Flag/Flag";
import { COUNTRIES } from "../../data/countries";

const WidgetContainer = styled.div`
  background: #1a1a1a;
  border-radius: 15px;
  padding: 25px 20px;
  text-align: center;
  border: 2px solid #333;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: ${(props) => (props.fullscreen ? "40px 30px" : "30px 25px")};
  }

  @media (min-width: 1024px) {
    padding: ${(props) => (props.fullscreen ? "50px 40px" : "35px 30px")};
  }

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
  font-size: 2rem;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.3));
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    font-size: ${(props) => (props.fullscreen ? "2.8rem" : "2.3rem")};
    margin-bottom: 15px;
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => (props.fullscreen ? "3rem" : "2.5rem")};
  }
`;

const FlagIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.3));
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    font-size: ${(props) => (props.fullscreen ? "2.8rem" : "2.3rem")};
    margin-bottom: 15px;
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => (props.fullscreen ? "3rem" : "2.5rem")};
  }
`;

const WidgetTitle = styled.h3`
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 15px;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  line-height: 1.3;
  word-wrap: break-word;
  hyphens: auto;

  @media (min-width: 768px) {
    font-size: ${(props) => (props.fullscreen ? "1.6rem" : "1.3rem")};
    margin-bottom: 18px;
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => (props.fullscreen ? "1.8rem" : "1.4rem")};
    margin-bottom: 20px;
  }
`;

const MainValue = styled.div`
  font-size: 2.8rem;
  font-weight: 900;
  color: #00ff88;
  margin: 20px 0;
  font-family: "Courier New", monospace;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
  line-height: 1;
  letter-spacing: -1px;
  word-break: break-all;

  @media (min-width: 768px) {
    font-size: ${(props) => (props.fullscreen ? "4.5rem" : "3.8rem")};
    margin: 22px 0;
    letter-spacing: -1.5px;
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => (props.fullscreen ? "5.5rem" : "4.5rem")};
    margin: 25px 0;
    letter-spacing: -2px;
  }
`;

const SarcasticMessage = styled.div`
  font-size: 1rem;
  color: #ffaa00;
  font-style: italic;
  margin-top: 20px;
  line-height: 1.4;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(255, 170, 0, 0.3);
  padding: 12px;
  background: rgba(255, 170, 0, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(255, 170, 0, 0.2);
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  hyphens: auto;

  @media (min-width: 768px) {
    font-size: ${(props) => (props.fullscreen ? "1.3rem" : "1.1rem")};
    margin-top: 22px;
    padding: 14px;
    min-height: ${(props) => (props.fullscreen ? "3.8rem" : "3.4rem")};
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => (props.fullscreen ? "1.4rem" : "1.2rem")};
    margin-top: 25px;
    padding: 15px;
    min-height: ${(props) => (props.fullscreen ? "4rem" : "3.5rem")};
  }
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

  useEffect(() => {
    if (value !== lastValue) {
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 300);
      setLastValue(value);
    }
  }, [value, lastValue]);

  useEffect(() => {
    const initialMessage = getDynamicMessage(metricKey, countryCode);
    setCurrentMessage(initialMessage);

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

  const renderIcon = () => {
    if (metricKey === "currentPopulation" && countryCode !== "world") {
      const country = COUNTRIES[countryCode];
      const flagSize = fullscreen
        ? window.innerWidth < 768
          ? "32px"
          : "48px"
        : window.innerWidth < 768
        ? "28px"
        : "40px";

      return (
        <FlagIcon fullscreen={fullscreen}>
          <Flag
            countryCode={country?.countryCode || countryCode}
            size={flagSize}
          />
        </FlagIcon>
      );
    }

    return <WidgetIcon fullscreen={fullscreen}>{icon}</WidgetIcon>;
  };

  return (
    <WidgetContainer fullscreen={fullscreen}>
      {renderIcon()}

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
