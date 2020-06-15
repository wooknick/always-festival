import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import YouTube from "@u-wave/react-youtube";

const STAGE_NAME = ["STAGE A", "STAGE B", "STAGE C"];

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
  min-width: 100%;
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

const Player = ({ stageNo, fullpageApi, data, play }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const videoRef = useRef();
  const onStageData = data[Math.floor(new Date().getHours() / 2)];

  useEffect(() => {
    setInterval(() => {
      setTextIndex((v) => (v + 1) % onStageData.comments.length);
    }, 20000);
  }, [onStageData]);

  useEffect(() => {
    if (play) {
      if (pause) {
        videoRef.current.playerInstance.pauseVideo();
      } else {
        videoRef.current.playerInstance.playVideo();
      }
    }
  }, [pause, play]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const section = fullpageApi.getActiveSection()?.index;
      const slide = fullpageApi.getActiveSlide()?.index;

      if (section === 1) {
        if (play) {
          if (event.code === "ArrowRight") {
            const now = videoRef.current.playerInstance.getCurrentTime();
            videoRef.current.playerInstance.seekTo(now + 10);
          } else if (event.code === "ArrowLeft") {
            const now = videoRef.current.playerInstance.getCurrentTime();
            videoRef.current.playerInstance.seekTo(now - 10);
          } else if (event.code === "ArrowUp") {
            const now = videoRef.current.playerInstance.getVolume();
            videoRef.current.playerInstance.setVolume(now + 5);
          } else if (event.code === "ArrowDown") {
            const now = videoRef.current.playerInstance.getVolume();
            videoRef.current.playerInstance.setVolume(now - 5);
          }
        }
        if (event.code === "Space") {
          setPause((v) => !v);
        } else if (event.code === "KeyH") {
          setPause(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullpageApi, play]);

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
          disableKeyboard={true}
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
