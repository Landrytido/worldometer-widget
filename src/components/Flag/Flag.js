// src/components/Flag/Flag.js - Avec émoji globe pour le monde
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FlagImage = styled.img`
  width: ${(props) => props.size || "24px"};
  height: auto;
  border-radius: 3px;
  margin-right: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  vertical-align: middle;
  display: ${(props) => (props.hasError ? "none" : "inline-block")};
`;

const FallbackText = styled.span`
  display: ${(props) => (props.show ? "inline-block" : "none")};
  width: ${(props) => props.size || "24px"};
  height: 18px;
  background: #333;
  color: #fff;
  font-size: 10px;
  text-align: center;
  line-height: 18px;
  border-radius: 3px;
  margin-right: 8px;
  font-weight: bold;
`;

const WorldGlobe = styled.span`
  display: inline-block;
  font-size: ${(props) => {
    const sizeNumber = parseInt(props.size) || 24;
    return `${Math.max(sizeNumber - 2, 16)}px`; // Légèrement plus petit que la taille demandée
  }};
  margin-right: 8px;
  vertical-align: middle;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
`;

const Flag = ({ countryCode, size = "24px" }) => {
  const [hasError, setHasError] = useState(false);

  // Reset de l'erreur quand le countryCode change
  useEffect(() => {
    setHasError(false);
  }, [countryCode]);

  // Cas spécial pour le monde : afficher directement un émoji globe
  if (countryCode === "world" || countryCode === "un") {
    return <WorldGlobe size={size}>🌍</WorldGlobe>;
  }

  const flagUrl = `https://flagpedia.net/data/flags/w160/${countryCode.toLowerCase()}.png`;

  const handleError = () => {
    setHasError(true);
  };

  const handleLoad = () => {
    setHasError(false);
  };

  return (
    <>
      <FlagImage
        src={flagUrl}
        alt={`Drapeau ${countryCode}`}
        size={size}
        hasError={hasError}
        onError={handleError}
        onLoad={handleLoad}
        key={countryCode} // Force le remount quand le pays change
      />
      <FallbackText size={size} show={hasError}>
        {countryCode.toLowerCase()}
      </FallbackText>
    </>
  );
};

export default Flag;
