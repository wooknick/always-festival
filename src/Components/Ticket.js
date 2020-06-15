import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #061820;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 80vw;
  height: 200px;
  background-color: #c7a17d;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  &:last-child {
    background-color: #061820;
    border: 2px solid #c7a17d;
    border-top: none;
  }
`;

const InnerBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #c7a17d;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #061820;
  border: 2px solid #061820;
  padding: 3px;
`;

const DoubleInnerBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #c7a17d;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #061820;
  border: 2px dashed #061820;
  font-family: "Great Vibes", cursive;
  font-size: 50px;
`;

const Message = styled.div`
  font-family: "Bellota", cursive;
  color: #c7a17d;
  font-size: 20px;
  font-weight: 200;
`;

const Ticket = () => {
  return (
    <Wrapper>
      <Box>
        <InnerBox>
          <DoubleInnerBox>Invitation</DoubleInnerBox>
        </InnerBox>
      </Box>
      <Box>
        <Message>
          Enjoy the festival
          <br /> on the big screen.
        </Message>
      </Box>
    </Wrapper>
  );
};

export default Ticket;
