import React from "react";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import StageBlue from "../Images/StageBlue.png";
import StageRed from "../Images/StageRed.png";

const WaveFrame = (x, y) => keyframes`
0%, 100%{
  background-position-x: ${x - 4}%;
}
50%{
  background-position-x: ${x + 4}%;
}
`;

const WaveAnimation = (x, y) => css`
  animation: ${WaveFrame(x, y)} ${Math.random() * 3 + 12}s linear infinite;
`;

const Pattern = styled.div`
  width: 100%;
  height: ${(props) => (props.isPortrait ? props.ratio : 100)}%;
  background-image: url(${(props) => props.image});
  background-size: 250%;
  background-position-x: ${(props) => props.x}%;
  background-position-y: ${(props) => props.y}%;
  padding: 1.5rem;
  ${(props) => WaveAnimation(props.x, props.y)};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  color: ${(props) =>
    props.stage === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  text-transform: uppercase;
  font-family: DiscoDiva;
  -webkit-text-stroke: 2px;
  text-align: center;
  line-height: 1.4em;
`;

const Entrance = ({ stage, ratio, isPortrait, height, width }) => {
  const image = stage === "red" ? StageRed : StageBlue;
  const x = parseInt(Math.random() * 70 + 5);
  const y = parseInt(Math.random() * 70 + 5);

  return (
    <Pattern
      stage={stage}
      ratio={ratio}
      isPortrait={isPortrait}
      image={image}
      x={x}
      y={y}
    >
      <Link to={`/stage/${stage}`}>
        <Wrapper stage={stage}>
          <Title>
            <span>{stage} stage</span>
          </Title>
        </Wrapper>
      </Link>
    </Pattern>
  );
};

export default Entrance;
