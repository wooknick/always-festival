import React from "react";
import styled from "styled-components";
import { Textfit } from "react-textfit";
import StageBlue from "../Images/StageBlue.png";
import StageRed from "../Images/StageRed.png";

const Pattern = styled.div`
  width: 100%;
  height: ${(props) => props.ratio}%;
  background-image: url(${(props) => props.image});
  background-size: 250%;
  background-position-x: ${(props) => props.x}%;
  background-position-y: ${(props) => props.y}%;
  padding: 1.5rem;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  color: ${(props) =>
    props.name === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  text-transform: uppercase;
  font-family: DiscoDiva;
  -webkit-text-stroke: 2px;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Entrance = ({ name, ratio }) => {
  const image = name === "red" ? StageRed : StageBlue;
  const x = parseInt(Math.random() * 100);
  const y = parseInt(Math.random() * 100);
  return (
    <Pattern name={name} ratio={ratio} image={image} x={x} y={y}>
      <Wrapper name={name}>{name} stage</Wrapper>
    </Pattern>
  );
};

export default Entrance;
