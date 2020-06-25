import React, { useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import BounceArrow from "../Images/BounceArrow.png";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.home.background};
`;

const Logo = styled.div`
  p {
    font-family: "Retrock";
    font-size: 28vw;
    margin-bottom: 1.5em;
  }
`;

const BounceFrame = keyframes`
  0%, 100% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
    -webkit-transform: translateY(-10px);
  }
`;

const BounceAnimation = css`
  animation-name: ${BounceFrame};
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  -webkit-animation-name: ${BounceFrame};
  -webkit-animation-duration: 1s;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-fill-mode: both;
`;

const BounceArrowWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 5rem;
  img {
    width: 100%;
    ${BounceAnimation}
  }
`;

const Home = ({ fullpageApi }) => {
  useEffect(() => {
    if (fullpageApi) {
      fullpageApi.setAllowScrolling(false, "left, right");
    }
    return () => {
      if (fullpageApi) {
        fullpageApi.setAllowScrolling(true, "left, right");
      }
    };
  }, [fullpageApi]);

  return (
    <Wrapper>
      <Logo>
        <p>AlwaysFestival3</p>
      </Logo>
      <BounceArrowWrapper>
        <img src={BounceArrow} alt="BounceArrow"></img>
      </BounceArrowWrapper>
    </Wrapper>
  );
};

export default Home;
