import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import YouTube from "@u-wave/react-youtube"; // for youtube api
import { useMediaQuery } from "react-responsive";
import { getAvailableVideo } from "../util";
import StageBlue from "../Images/StageBlue.png";
import StageRed from "../Images/StageRed.png";

const LINEUP = {
  blue: [
    "BTS 34:50",
    "WEEKEND 6:20",
    "BEYONCE 58:40",
    "Pink Floyd 34:50",
    "IMAGINE DRAGONS 57:32",
    "1975 48:59",
    "Carpenters 42:11",
    "Queen 17:32",
    "Prince 29:43",
    "Whitney Houston 84:14",
  ],
  red: [
    "BILLIE EILISH 34:23",
    "David Bowie 6:20",
    "Bob Marley 58:40",
    "Bob Dylan 34:23",
    "Beatles 57:32",
    "Rolling Stones 48:59",
    "The Who 42:11",
    "Amy Winehouse 17:32",
    "jamiroquai 29:43",
    "Coldplay 84:14",
  ],
};

const PLAY_DUMMY = {
  blue: {
    id: ["aed3lLLSUHk", "SqdE10H4ZCk"],
    artist: "BEYONCE",
    comment: [
      `Beyoncé DID THAT!!! She’s the only artist in this generation that knows how to put on a show. The greatest performer of all time.`,
      `It’s crazy.`, // 70, 11 = 6.3
      `She is so unbelievably beautiful.`, // 255, 33 = 7.72
      `Beyoncé is the best performer I’ve ever seen`, // 354, 44 = 8
      `Beyoncé deserves every bit of screaming when she gets on that stage`,
      `Legend`,
      `She is beautifully awesome .`,
      `great entertainer even better than michael Jackson`,
      `I cried when she sang I will always love you`,
      `Beautiful..just beautiful..`, // 187, 27 = 6.92
    ],
  },
  red: {
    id: ["lpKE6yBw2Os"],
    artist: "BILLIE EILISH",
    comment: [
      "Billie got a sprained ankle but she still rocking that brace",
      "shes dead ass jumping and dancing on a broke. leg wtf queen",
      "I love how she is so natural. She is so comfortable just being herself. You don't see that much anymore.",
      "i like how she can sing so well even when shes out of breath its amazinggg",
      "No one ever talks about how good that drummer is doing",
      "her brother is a gold, she is really lucky to has brother like him",
      "I'M A BAD GUY DUUUH OOOOOOOOOOOOOOOOOOOOOWWWW LOVE",
      "i love how she can jump so high even with a boot on",
      "This drummer (Andrew) is honestly amazing",
      "her eyes matches her hair, I love it ",
    ],
  },
};

const Wrapper = styled.div`
  padding-top: 3.5rem;
  width: 100%;
  height: ${(props) => props.height}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) =>
    props.stage === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
`;

const Video = styled.div`
  height: 50%;
  width: 100vw;
  flex: 1;
`;

const YoutubeWrapper = styled.div`
  width: 100%;
  height: 75%;
`;

const Artist = styled.div`
  width: 100%;
  max-height: 50px;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 30px;
  div {
    font-family: discoDiva;
    font-size: 1.2rem;
    color: white;
  }
`;

const MarqueeFrame = (width) => keyframes`
  from{
    -webkit-transform: translate(${width}px, 0);
    transform: translate(${width}px, 0);
  }
  to{
    -webkit-transform: translate(-110%, 0);
    transform: translate(-110%, 0);
  }
  `;

const MarqueeAnimation = (width) => css`
  animation-name: ${MarqueeFrame(width)};
  animation-duration: ${parseInt(width / 70)}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  -webkit-animation-name: ${MarqueeFrame(width)};
  -webkit-animation-duration: ${parseInt(width / 70)}s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-fill-mode: both;
`;

const Comment = styled.div`
  width: 100%;
  max-height: 50px;
  height: 10%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0px 30px;
  div {
    font-family: Mont;
    color: white;
    /* min-width: 100%; */
    width: max-content;
    white-space: nowrap;
    display: flex;
    align-items: center;
    ${(props) => MarqueeAnimation(props.width)};
  }
`;

const WaveFrame = (x, y) => keyframes`
  0%{
    background-position-x: ${x}%;
    background-position-y: ${y}%;
  }
  12.5%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y + Math.random() * 8 - 4}%;
  }
  25%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y}%;
  }
  37.5%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y + Math.random() * 8 - 4}%;
  }
  50%{
    background-position-x: ${x}%;
    background-position-y: ${y + Math.random() * 8 - 4}%;
  }
  62.5%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y + Math.random() * 8 - 4}%;
  }
  75%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y}%;
  }
  87.5%{
    background-position-x: ${x + Math.random() * 8 - 4}%;
    background-position-y: ${y + Math.random() * 8 - 4}%;
  }
  100%{
    background-position-x: ${x}%;
    background-position-y: ${y}%;
  }
`;

const WaveAnimation = (x, y) => css`
  animation: ${WaveFrame(x, y)} ${Math.random() * 3 + 8}s linear infinite;
`;

const Lineup = styled.div`
  width: 100%;
  height: 50%;
  background-image: url(${(props) => props.image});
  background-size: 250%;
  background-position-x: ${(props) => props.x}%;
  background-position-y: ${(props) => props.y}%;
  padding: 1rem;
  ${(props) => WaveAnimation(props.x, props.y)};
`;

const LineupWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: white;
  color: ${(props) =>
    props.Stage === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  text-transform: uppercase;
  border: white 5px solid;
`;

const LineupItem = styled.div`
  width: 100%;
  height: 2.5em;
  font-size: 1.6rem;
  color: ${(props) =>
    props.stage === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Varietee";
`;

const getTextWidth = (txt, font) => {
  const element = document.createElement("canvas");
  const context = element.getContext("2d");
  context.font = font;
  return context.measureText(txt).width;
};

const Stage = ({ history, match }) => {
  const {
    params: { stage },
  } = match;
  const image = stage === "red" ? StageRed : StageBlue;

  const [videos, setVideos] = useState([]);
  const [x, setX] = useState(parseInt(Math.random() * 90 + 5));
  const [y, setY] = useState(parseInt(Math.random() * 90 + 5));
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [comments, setComments] = useState(PLAY_DUMMY[stage].comment);
  const [marqueeValue, setMarqueeValue] = useState(0);
  const [comIdx, setComIdx] = useState(0);
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const t = useRef();

  useEffect(() => {
    const getVideos = async (raw_videos) => {
      const available_videos = await getAvailableVideo(raw_videos);
      if (available_videos.length === 0) {
        setVideos(["B6fhtHptMnI"]); // should be never broken
      } else {
        setVideos(available_videos);
      }
    };
    getVideos(PLAY_DUMMY[stage].id);
  }, [stage]);

  useEffect(() => {
    setComments(PLAY_DUMMY[stage].comment);
  }, [stage]);

  useEffect(() => {
    const w = comments.map(
      (comment) =>
        parseInt(getTextWidth(comment, "Mont, 16px") * 2) + windowWidth
    );
    setMarqueeValue(w);
  }, [comments, windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(t.current);
      t.current = setTimeout(() => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <Wrapper stage={stage} height={windowHeight}>
      <Video>
        <YoutubeWrapper
        // dangerouslySetInnerHTML={getYoutubeIframe(PLAY_DUMMY[stage].id)}
        >
          <YouTube
            width="100%"
            height="100%"
            video={videos[0]}
            playsInline={true}
          />
        </YoutubeWrapper>
        <Artist>
          <div>{PLAY_DUMMY[stage].artist}</div>
        </Artist>
        <Comment width={marqueeValue[comIdx]}>
          <div
            onAnimationIteration={() => {
              setComIdx((v) => (v + 1) % 10);
            }}
          >
            {comments[comIdx]}
          </div>
        </Comment>
      </Video>
      {isPortrait && (
        <Lineup stage={stage} image={image} x={x} y={y}>
          <LineupWrapper stage={stage}>
            {LINEUP[stage].map((artist, idx) => (
              <LineupItem key={idx} stage={stage}>
                {artist}
              </LineupItem>
            ))}
          </LineupWrapper>
        </Lineup>
      )}
    </Wrapper>
  );
};

export default Stage;
