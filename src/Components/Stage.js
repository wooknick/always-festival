import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import BounceArrow from "../Images/BounceArrow.png";
import { Textfit } from "react-textfit";
import YouTube from "@u-wave/react-youtube"; // for youtube api

const STAGE_NAME = {
  home: "STAGE A",
  stageA: "STAGE A",
  stageB: "STAGE B",
  stageC: "STAGE C",
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color[`${props.from}`].background};
`;

const Logo = styled.div`
  height: 10%;
  max-height: 4rem;
  display: flex;
  align-items: center;
  span {
    margin-top: -0.2em;
    font-family: "Retrock";
    font-size: 3.4rem;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Info = styled.div`
  height: 20%;
  max-height: 8rem;
  width: 80vw;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StageTitle = styled.div`
  font-weight: bold;
  font-size: 3.8rem;
  -webkit-text-stroke: 2.5px black;
  color: ${(props) => props.theme.color[`${props.from}`].background};
`;

const Time = styled.div`
  font-weight: bold;
  -webkit-text-stroke: 1px black;
  font-size: 2rem;
  margin-top: 0.3em;
`;

const Artist = styled.div`
  height: 18%;
  max-height: 7.2rem;
  width: 80vw;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    div {
      height: auto;
      font-weight: bold;
      -webkit-text-stroke: 2px black;
    }
  }
`;

const Video = styled.div`
  height: 42%;
  width: 100vw;
  flex: 1;
`;

const YoutubeWrapper = styled.div`
  width: 100%;
  height: 90%;
`;

const Comment = styled.div`
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

const CommentText = styled.div`
  min-width: 100%;
  width: max-content;
  white-space: nowrap;
  height: 50px;
  display: flex;
  align-items: center;
  animation: ${marquee} 20s linear infinite;
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
  width: 2.5rem;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10px;
  img {
    width: 100%;
    ${BounceAnimation}
  }
`;

const Stage = ({ fullpageApi, from, data }) => {
  const [textIndex, setTextIndex] = useState(0);
  const videoRef = useRef(); // for youtbe api

  useEffect(() => {
    setInterval(() => {
      setTextIndex((v) => (v + 1) % data.comments.length);
    }, 20000);
  }, [data.comments.length]);

  const goHome = () => {
    return () => {
      fullpageApi.silentMoveTo(2, 0);
    };
  };

  const getYoutubeIframe = (video_id) => {
    return {
      __html: `<iframe
      id="ytplayer"
      type="text/html"
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/${video_id}?autoplay=1&playsinline=1"
      frameborder="0"
     />`,
    };
  };

  return (
    <Wrapper from={from}>
      <Logo onClick={goHome()}>
        <span>AlwaysFestival3</span>
      </Logo>
      <Info>
        <StageTitle from={from}>{STAGE_NAME[from]}</StageTitle>
        <Time>
          {`${Math.floor(new Date().getHours() / 2) * 2}:00 - ${
            Math.floor(new Date().getHours() / 2) * 2 + 2
          }:00`}
        </Time>
      </Info>
      <Artist>
        <Textfit mode="single" max={80} forceSingleModeWidth={true}>
          {data.artist}
        </Textfit>
      </Artist>
      <Video>
        <YoutubeWrapper
          dangerouslySetInnerHTML={getYoutubeIframe(data.video_id)}
        />
        {/* <YoutubeWrapper>
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
        </YoutubeWrapper> */}
        <Comment>
          <CommentText>{data.comments[textIndex]}</CommentText>
        </Comment>
      </Video>
      <BounceArrowWrapper>
        <img src={BounceArrow} alt="BounceArrow"></img>
      </BounceArrowWrapper>
    </Wrapper>
  );
};

export default Stage;
