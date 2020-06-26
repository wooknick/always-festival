import React, { useState, useEffect } from "react";
import styled from "styled-components";
import stageA from "../Images/stageA.jpg";
import stageB from "../Images/stageB.jpg";
import stageC from "../Images/stageC.jpg";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color[`${props.from}`].background};
`;

const Card = styled.div`
  width: 100%;
  height: 30%;
  max-height: 12rem;
  margin-bottom: 10px;
  background-image: url(${(props) => props.imgSrc});
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: ${(props) => props.posY};
  &:hover {
    cursor: pointer;
  }
`;

const CardTextWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(51, 56, 59, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: bold;
    color: white;
  }
`;

const FROM_NAME = ["home", "stageA", "stageB", "stageC"];

const Navigation = ({ fullpageApi, from }) => {
  const [fromS, setFromS] = useState("home");

  useEffect(() => {
    if (from) {
      setFromS(from);
    }
  }, [from]);

  const moveTo = (stageIdx) => {
    return () => {
      if (fromS === FROM_NAME[stageIdx]) {
        return;
      }
      fullpageApi.silentMoveTo(2, stageIdx);
    };
  };

  return (
    <Wrapper from={fromS}>
      <Card imgSrc={stageA} posY={"50%"} onClick={moveTo(1)}>
        <CardTextWrapper>
          <span>STAGE A</span>
        </CardTextWrapper>
      </Card>
      <Card imgSrc={stageB} posY={"50%"} onClick={moveTo(2)}>
        <CardTextWrapper>
          <span>STAGE B</span>
        </CardTextWrapper>
      </Card>
      <Card imgSrc={stageC} posY={"50%"} onClick={moveTo(3)}>
        <CardTextWrapper>
          <span>STAGE C</span>
        </CardTextWrapper>
      </Card>
    </Wrapper>
  );
};

export default Navigation;
