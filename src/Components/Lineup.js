import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color[`${props.from}`].background};

  span {
    text-transform: uppercase;
    font-size: 3rem;
  }
`;

const Lineup = ({ from }) => {
  return (
    <Wrapper from={from}>
      <span>Lineup</span>
    </Wrapper>
  );
};

export default Lineup;
