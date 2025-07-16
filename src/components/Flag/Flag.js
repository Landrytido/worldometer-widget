// src/components/Flag/Flag.js
import React from "react";
import styled from "styled-components";

const FlagImage = styled.img`
  width: ${(props) => props.size || "24px"};
  height: auto;
  border-radius: 3px;
  margin-right: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  vertical-align: middle;
`;

const FallbackText = styled.span`
  display: inline-block;
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

const Flag = ({ countryCode, size = "24px" }) => {
  const flagUrl = `https://flagpedia.net/data/flags/w160/${countryCode.toLowerCase()}.png`;

  const handleError = (e) => {
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "inline-block";
  };

  return (
    <>
      <FlagImage
        src={flagUrl}
        alt={`Drapeau ${countryCode}`}
        size={size}
        onError={handleError}
      />
      <FallbackText size={size} style={{ display: "none" }}>
        {countryCode}
      </FallbackText>
    </>
  );
};

export default Flag;
