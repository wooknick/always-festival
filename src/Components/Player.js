import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import youtubeList from "../youtubeList";

const STAGE_NAME = ["STAGE A", "STAGE B", "STAGE C"];

const BANNER_TEXT_DUMMY = [
  "The color palettes in Coolors are user-contributed. Navigating the color palettes is fast and easy: Simply press the Spacebar on your keyboard and you’ll be shown a new set of colors. When you find colors you like, click on them to lock them in place. Once you’re happy with your color scheme, you can bookmark the URL to save it for a later time.",
  "Note that if anything has a device prop passed in it will take precedence over the one from context.",
  "You can use the onChange callback to specify a change handler that will be called when the media query's value changes.",
];

const bounce = keyframes`
0%{
  background-color: white;
}
100%{
  background-color: #6b3074;
  color: white;
}
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StageTitle = styled.div`
  width: 100%;
  height: 100%;
  flex: 0.6;
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScheduleButton = styled.div`
  width: 70%;
  height: 60px;
  flex: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #6b3074;
    color: white;
    animation: ${bounce} 0.2s linear;
  }
`;

const Youtube = styled.div`
  width: 100%;
  height: 70%;
  background-color: yellow;
`;

const Banner = styled.div`
  width: 100%;
  height: 50px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0px 30px;
`;

const marquee = keyframes`
  from{
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  to{
    -webkit-transform: translate(100%, 0);
    transform: translate(-100%, 0);
  }
  `;

const BannerText = styled.div`
  width: max-content;
  white-space: nowrap;
  height: 50px;
  display: flex;
  align-items: center;
  animation: ${marquee} 20s linear infinite;
`;

const Footer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const Button = styled.div`
  flex: 0.2;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #6b3074;
    color: white;
    animation: ${bounce} 0.2s linear;
  }
`;

const Player = ({ stageNo, fullpageApi }) => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTextIndex((v) => (v + 1) % BANNER_TEXT_DUMMY.length);
    }, 20000);
  }, []);
  return (
    <Wrapper>
      <Header>
        <StageTitle>{STAGE_NAME[stageNo]}</StageTitle>
        <ScheduleButton
          onClick={() => {
            fullpageApi.moveTo(1);
          }}
        >
          Go to Schedule
        </ScheduleButton>
      </Header>
      <Youtube
        dangerouslySetInnerHTML={{ __html: youtubeList[stageNo] }}
      ></Youtube>
      <Banner>
        <BannerText>{BANNER_TEXT_DUMMY[textIndex]}</BannerText>
      </Banner>
      <Footer>
        <Button
          onClick={() => {
            fullpageApi.moveTo(2, (stageNo + 2) % 3);
          }}
        >
          Go to {STAGE_NAME[(stageNo + 2) % 3]}
        </Button>
        <Button
          onClick={() => {
            fullpageApi.moveTo(2, (stageNo + 1) % 3);
          }}
        >
          Go to {STAGE_NAME[(stageNo + 1) % 3]}
        </Button>
      </Footer>
    </Wrapper>
  );
};

export default Player;
