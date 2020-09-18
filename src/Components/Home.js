import React, { useState, useEffect, useRef } from "react";
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
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const t = useRef();

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(t.current);
      t.current = setTimeout(() => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.outerWidth);
        setIsPortrait(window.innerHeight > window.innerWidth);
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Wrapper height={windowHeight} width={windowWidth} isPortrait={isPortrait}>
      <Entrance
        stage="red"
        ratio={50}
        isPortrait={isPortrait}
        height={windowHeight}
        width={windowWidth}
      />
      <Entrance
        stage="blue"
        ratio={50}
        isPortrait={isPortrait}
        height={windowHeight}
        width={windowWidth}
      />
    </Wrapper>
  );
};

export default Home;
