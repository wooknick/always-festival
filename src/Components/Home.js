import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Entrance from "./Entrance";

const Wrapper = styled.div`
  padding-top: 3.5rem;
  width: 100%;
  height: ${(props) => props.height}px;
  display: flex;
  flex-direction: ${(props) => (props.isPortrait ? "column" : "row")};
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

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
      <Entrance stage="red" ratio={50} isPortrait={isPortrait} />
      <Entrance stage="blue" ratio={50} isPortrait={isPortrait} />
    </Wrapper>
  );
};

export default Home;
