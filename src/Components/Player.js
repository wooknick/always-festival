import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import YouTube from "@u-wave/react-youtube";

const STAGE_NAME = ["STAGE A", "STAGE B", "STAGE C"];

const BANNER_TEXT_DUMMY = [
  "The color palettes in Coolors are user-contributed. Navigating the color palettes is fast and easy: Simply press the Spacebar on your keyboard and you’ll be shown a new set of colors. When you find colors you like, click on them to lock them in place. Once you’re happy with your color scheme, you can bookmark the URL to save it for a later time.",
  "Note that if anything has a device prop passed in it will take precedence over the one from context.",
  "You can use the onChange callback to specify a change handler that will be called when the media query's value changes.",
];

const hoverFrames = keyframes`
0%{
  background-color: white;
}
100%{
  background-color: ${(props) => props.theme.color.hover};
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
    background-color: ${(props) => props.theme.color.hover};
    color: white;
    animation: ${hoverFrames} 0.2s linear;
  }
`;

const YoutubeWrapper = styled.div`
  width: 100%;
  height: 70%;
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
    background-color: ${(props) => props.theme.color.hover};
    color: white;
    animation: ${hoverFrames} 0.2s linear;
  }
`;

const makeYoutube = (video_id) => {
  return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${video_id}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  // return `<iframe id="ytplayer" type="text/html" width="100%" height="100%"
  // src="https://www.youtube.com/embed/${video_id}?autoplay=1"
  // frameborder="0"></iframe>`;
};

const Player = ({ stageNo, fullpageApi, data, play }) => {
  const [textIndex, setTextIndex] = useState(0);
  const videoRef = useRef();
  const onStageData = data[Math.floor(new Date().getHours() / 2)];

  useEffect(() => {
    setInterval(() => {
      setTextIndex((v) => (v + 1) % BANNER_TEXT_DUMMY.length);
    }, 20000);
  }, []);

  useEffect(() => {
    if (play) {
      videoRef.current.playerInstance.playVideo();
    }
  }, [play]);

  const goToStage = (stageIdx) => {
    return () => {
      fullpageApi.moveTo(2, stageIdx);
    };
  };

  const goToSchedule = () => {
    return () => {
      fullpageApi.moveTo(1);
    };
  };

  return (
    <Wrapper>
      <Header>
        <StageTitle>{STAGE_NAME[stageNo]}</StageTitle>
        <ScheduleButton onClick={goToSchedule()}>Go to Schedule</ScheduleButton>
      </Header>
      <YoutubeWrapper>
        <YouTube
          ref={videoRef}
          width="100%"
          height="100%"
          video={onStageData.video_id}
          disableKeyboard={false}
          annotations={false}
          showRelatedVideos={false}
          showInfo={false}
          modestBranding={true}
        />
      </YoutubeWrapper>
      <Banner>
        <BannerText>{onStageData.comments[textIndex]}</BannerText>
      </Banner>
      <Footer>
        <Button onClick={goToStage((stageNo + 2) % 3)}>
          Go to {STAGE_NAME[(stageNo + 2) % 3]}
        </Button>
        <Button onClick={goToStage((stageNo + 1) % 3)}>
          Go to {STAGE_NAME[(stageNo + 1) % 3]}
        </Button>
      </Footer>
    </Wrapper>
  );
};

export default Player;
