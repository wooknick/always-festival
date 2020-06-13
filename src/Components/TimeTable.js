import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 768px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
  margin: auto;
`;

const Title = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const TitleText = styled.div`
  font-size: 32px;
  text-transform: uppercase;
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  flex: 0.5;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const InfoText = styled.span`
  /* border-bottom: 1px solid #7268a6; */
  margin-bottom: 10px;
  margin-right: 15px;
  padding: 4px 2px;
  font-size: 15px;
`;

const Content = styled.div`
  width: 100%;
  height: 700px;
  display: grid;
  grid-template-columns: 0.3fr 1fr 1fr 1fr;
  column-gap: 5px;
`;

const Time = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(28, 1fr);
  row-gap: 4px;
  ${(props) => {
    return `div:nth-of-type(${Math.floor(props.hour / 2) + 2}){
      border-top: 4px solid #7268a6;
    }`;
  }}
`;

const TimeCell = styled.div`
  width: 100%;
  height: 100%;
  font-size: 18px;
  text-align: right;
  grid-row: ${(props) => props.gridRow};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5px;
  user-select: none;
`;

const Stage = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(14, 1fr);
  row-gap: 4px;
  div:nth-of-type(${(props) => Math.floor(props.hour / 2) + 1}) {
    background-color: #7268a6;
    color: white;
    font-weight: bold;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }
`;

const StageTitle = styled.header`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 23px;
  color: #195c77;
`;

const StageCell = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const bounce = keyframes`
0%{
  background-color: white;
}
100%{
  background-color: #6b3074;
  color: white;
}
`;

const StageArrow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #6b3074;
    color: white;
    animation: ${bounce} 0.2s linear;
  }
`;

const TimeTable = ({ screen, fullpageApi }) => {
  const [hour, setHour] = useState(0);

  useEffect(() => {
    setHour(new Date().getHours());
  }, []);

  return screen === "mobile" ? (
    <Wrapper>Not Support Mobile Yet</Wrapper>
  ) : (
    <Wrapper>
      <Title>
        <TitleText>Timetable</TitleText>
        <Info>
          <InfoText>Enjoy the Festival of Legends!</InfoText>
          <InfoText>Every 2 hours, New Stage Come.</InfoText>
          <InfoText>You can use "Arrow Key" in Keyboard.</InfoText>
        </Info>
      </Title>
      <Content>
        <Time hour={hour}>
          <TimeCell gridRow={"2 / 4"}>00:00</TimeCell>
          <TimeCell gridRow={"4 / 6"}>02:00</TimeCell>
          <TimeCell gridRow={"6 / 8"}>04:00</TimeCell>
          <TimeCell gridRow={"8 / 10"}>06:00</TimeCell>
          <TimeCell gridRow={"10 / 12"}>08:00</TimeCell>
          <TimeCell gridRow={"12 / 14"}>10:00</TimeCell>
          <TimeCell gridRow={"14 / 16"}>12:00</TimeCell>
          <TimeCell gridRow={"16 / 18"}>14:00</TimeCell>
          <TimeCell gridRow={"18 / 20"}>16:00</TimeCell>
          <TimeCell gridRow={"20 / 22"}>18:00</TimeCell>
          <TimeCell gridRow={"22 / 24"}>20:00</TimeCell>
          <TimeCell gridRow={"24 / 26"}>22:00</TimeCell>
          <TimeCell gridRow={"26 / 28"}>24:00</TimeCell>
        </Time>
        <Stage hour={hour}>
          <StageTitle>Stage A</StageTitle>
          <StageCell bgColor="#D8E0BB">Lady Gaga</StageCell>
          <StageCell bgColor="#D8E0BB">Jimmy Buffett</StageCell>
          <StageCell bgColor="#D8E0BB">The Weeknd</StageCell>
          <StageCell bgColor="#D8E0BB">Drake</StageCell>
          <StageCell bgColor="#D8E0BB">Luke Combs</StageCell>
          <StageCell bgColor="#D8E0BB">Post Malone</StageCell>
          <StageCell bgColor="#D8E0BB">DaBaby</StageCell>
          <StageCell bgColor="#D8E0BB">Lil Baby</StageCell>
          <StageCell bgColor="#D8E0BB">Roddy Ricch</StageCell>
          <StageCell bgColor="#D8E0BB">Run The hJewels</StageCell>
          <StageCell bgColor="#D8E0BB">Harry Styles</StageCell>
          <StageCell bgColor="#D8E0BB">Dua Lipa</StageCell>
          <StageArrow
            onClick={() => {
              fullpageApi.moveTo(2, 0);
            }}
          >
            Go This Stage
          </StageArrow>
        </Stage>
        <Stage hour={hour}>
          <StageTitle>Stage B</StageTitle>
          <StageCell bgColor="#B6CEC7">Billie Eilish</StageCell>
          <StageCell bgColor="#B6CEC7">Justin Bieber</StageCell>
          <StageCell bgColor="#B6CEC7">Morgan Wallen</StageCell>
          <StageCell bgColor="#B6CEC7">Travis Scott</StageCell>
          <StageCell bgColor="#B6CEC7">Gunna</StageCell>
          <StageCell bgColor="#B6CEC7">Juice WRLD</StageCell>
          <StageCell bgColor="#B6CEC7">Lewis Capaldi</StageCell>
          <StageCell bgColor="#B6CEC7">Megan Thee Stallion</StageCell>
          <StageCell bgColor="#B6CEC7">BTS</StageCell>
          <StageCell bgColor="#B6CEC7">Polo G</StageCell>
          <StageCell bgColor="#B6CEC7">Ariana Grande</StageCell>
          <StageCell bgColor="#B6CEC7">Doja Cat</StageCell>
          <StageArrow
            onClick={() => {
              fullpageApi.moveTo(2, 1);
            }}
          >
            Go This Stage
          </StageArrow>
        </Stage>
        <Stage hour={hour}>
          <StageTitle>Stage C</StageTitle>
          <StageCell bgColor="#86A3C3">Sam Hunt</StageCell>
          <StageCell bgColor="#86A3C3">Future</StageCell>
          <StageCell bgColor="#86A3C3">Kane Brown</StageCell>
          <StageCell bgColor="#86A3C3">Halsey</StageCell>
          <StageCell bgColor="#86A3C3">Khalid</StageCell>
          <StageCell bgColor="#86A3C3">Mac Miller</StageCell>
          <StageCell bgColor="#86A3C3">Bad Bunny</StageCell>
          <StageCell bgColor="#86A3C3">Ed Sheeran</StageCell>
          <StageCell bgColor="#86A3C3">Luke Bryan</StageCell>
          <StageCell bgColor="#86A3C3">Thomas Rhett</StageCell>
          <StageCell bgColor="#86A3C3">Jonas Brothers</StageCell>
          <StageCell bgColor="#86A3C3">Maren Morris</StageCell>
          <StageArrow
            onClick={() => {
              fullpageApi.moveTo(2, 2);
            }}
          >
            Go This Stage
          </StageArrow>
        </Stage>
      </Content>
    </Wrapper>
  );
};

export default TimeTable;
