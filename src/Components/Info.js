import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import ColorContext from "./ColorContext";

const Wrapper = styled.div`
  padding-top: 3.5rem;
  width: 100%;
  height: ${(props) => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  width: 75vw;
  height: 22rem;
  border-top: 0.2em solid
    ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
  border-bottom: 0.2em solid
    ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-family: Mont;
  span {
    color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
    text-align: center;
    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }
`;

const Info = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const { color, setColor } = useContext(ColorContext);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Wrapper height={windowHeight} width={windowWidth} isPortrait={isPortrait}>
      <Contents color={color}>
        <span>Festival is always on.</span>
        <span>We offer 12 live perfomances on two stages every day.</span>
        <span>(UTC +0)</span>
      </Contents>
    </Wrapper>
  );
};

export default Info;
