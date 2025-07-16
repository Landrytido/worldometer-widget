import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDynamicMessage } from "../../data/metrics";
import Flag from "../Flag/Flag";
import { COUNTRIES } from "../../data/countries";

const WidgetContainer = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  padding: 20px 16px;
  text-align: center;
  border: 2px solid #333;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: ${(props) => (props.fullscreen ? "35px 25px" : "25px 20px")};
    border-radius: 15px;
    min-height: 220px;
  }

  @media (min-width: 1024px) {
    padding: ${(props) => (props.fullscreen ? "40px 30px" : "30px 25px")};
    min-height: 240px;
  }

  &:hover {
    border-color: #00ff88;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.2);
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
  font-size: 1.8rem;
  margin-bottom: 8px;
  filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.3));
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    font-size: ${(props) => (props.fullscreen ? "2.5rem" : "2.2rem")};
    margin-bottom: 12px;
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => (props.fullscreen ? "2.8rem" : "2.5rem")};
    margin-bottom: 15px;
  }
`;

const FlagIcon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 8px;
  filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.3));
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    font-size: ${(props) => (props.fullscreen ? "2.5rem" : "2.2rem")};
    margin-bottom: 12px;
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => (props.fullscreen ? "2.8rem" : "2.5rem")};
    margin-bottom: 15px;
  }
`;

const WidgetTitle = styled.h3`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 12px;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  line-height: 1.2;
  word-wrap: break-word;
  hyphens: auto;

  @media (min-width: 768px) {
    font-size: ${(props) => (props.fullscreen ? "1.4rem" : "1.2rem")};
    margin-bottom: 15px;
    line-height: 1.3;
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => (props.fullscreen ? "1.6rem" : "1.3rem")};
    margin-bottom: 18px;
  }
`;

const MainValue = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  color: #00ff88;
  margin: 15px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  text-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
  line-height: 1;
  letter-spacing: -0.5px;
  overflow-wrap: break-word;
  word-break: normal;

  @media (min-width: 480px) {
    font-size: 2.8rem;
  }

  @media (min-width: 768px) {
    font-size: ${(props) => (props.fullscreen ? "4rem" : "3.2rem")};
    margin: 18px 0;
    letter-spacing: -1px;
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => (props.fullscreen ? "4.8rem" : "3.8rem")};
    margin: 20px 0;
    letter-spacing: -1.5px;
  }

  @media (min-width: 1400px) {
    font-size: ${(props) => (props.fullscreen ? "5.2rem" : "4.2rem")};
  }
`;

const SarcasticMessage = styled.div`
  font-size: 0.9rem;
  color: #ffaa00;
  font-style: italic;
  margin-top: 15px;
  line-height: 1.3;
  font-weight: 600;
  text-shadow: 0 0 8px rgba(255, 170, 0, 0.3);
  padding: 10px;
  background: rgba(255, 170, 0, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(255, 170, 0, 0.15);
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  hyphens: auto;
  text-align: center;

  @media (min-width: 768px) {
    font-size: ${(props) => (props.fullscreen ? "1.2rem" : "1rem")};
    margin-top: 18px;
    padding: 12px;
    min-height: ${(props) => (props.fullscreen ? "3.2rem" : "2.8rem")};
    border-radius: 10px;
    line-height: 1.4;
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => (props.fullscreen ? "1.3rem" : "1.1rem")};
    margin-top: 20px;
    padding: 14px;
    min-height: ${(props) => (props.fullscreen ? "3.5rem" : "3rem")};
  }
`;

const AnimatedCounter = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;

  &.updating {
    transform: scale(1.03);
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
    }, 8000);

    return () => clearInterval(interval);
  }, [metricKey, countryCode]);

  const formatNumber = (num) => {
    if (typeof num === "string") return num;
    const formattedNum = Math.floor(num);

    if (window.innerWidth < 480 && formattedNum > 999999) {
      if (formattedNum >= 1000000000) {
        return (formattedNum / 1000000000).toFixed(1) + "B";
      }
      return (formattedNum / 1000000).toFixed(1) + "M";
    }

    return new Intl.NumberFormat("fr-FR").format(formattedNum);
  };

  const renderIcon = () => {
    if (metricKey === "currentPopulation" && countryCode !== "world") {
      const country = COUNTRIES[countryCode];
      const getFlagSize = () => {
        if (window.innerWidth < 768) return "28px";
        if (fullscreen) return "40px";
        return "32px";
      };

      return (
        <FlagIcon fullscreen={fullscreen}>
          <Flag
            countryCode={country?.countryCode || countryCode}
            size={getFlagSize()}
          />
        </FlagIcon>
      );
    }

    return <WidgetIcon fullscreen={fullscreen}>{icon}</WidgetIcon>;
  };

  return (
    <WidgetContainer fullscreen={fullscreen}>
      <div>
        {renderIcon()}
        <WidgetTitle fullscreen={fullscreen}>{title}</WidgetTitle>
      </div>

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
