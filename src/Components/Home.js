import React from "react";
import styled from "styled-components";
import Entrance from "./Entrance";

const Wrapper = styled.div`
  padding-top: 3.5rem;
  width: 100%;
  /* height: calc(100vh); */
  height: ${(props) => props.height}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  scrollbar-color: transparent;
`;

const Home = () => {
  return (
    <Wrapper height={window.innerHeight}>
      <Entrance name="red" ratio={50} />
      <Entrance name="blue" ratio={50} />
    </Wrapper>
  );
};

export default Home;
