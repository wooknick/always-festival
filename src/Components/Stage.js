import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import YouTube from "@u-wave/react-youtube"; // for youtube api
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import queryString from "query-string";
import StageBlue from "../Images/StageBlue.png";
import StageRed from "../Images/StageRed.png";

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
  height: 55%;
  width: 100vw;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const YoutubeWrapper = styled.div`
  width: 100%;
  height: 70%;
  flex: 1;
`;

const Artist = styled.div`
  width: 100%;
  max-height: 4rem;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 0.4em;
  div {
    font-family: discoDiva;
    font-size: 1.2rem;
    color: white;
    text-align: center;
    line-height: 1.2em;
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
  max-height: 45px;
  height: 10%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0px 30px;
  font-size: 1.2rem;
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
0%, 100%{
  background-position-x: ${x - 4}%;
}
50%{
  background-position-x: ${x + 4}%;
}
`;

const WaveAnimation = (x, y) => css`
  animation: ${WaveFrame(x, y)} 16s linear infinite;
`;

const Lineup = styled.div`
  width: 100%;
  height: 45%;
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
    props.stage === "red"
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
  text-align: center;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${(props) =>
      props.stage === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
  }
`;

const getTextWidth = (txt, font) => {
  const element = document.createElement("canvas");
  const context = element.getContext("2d");
  context.font = font;
  return context.measureText(txt).width;
};

const Stage = ({ history, match, location }) => {
  const {
    params: { stage },
  } = match;
  const query = queryString.parse(location.search);
  const image = stage === "red" ? StageRed : StageBlue;

  const [data, setData] = useState([]);
  const [onStage, setOnStage] = useState({});
  const [loading, setLoading] = useState(true);

  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);

  const [comIdx, setComIdx] = useState(0);
  const [marqueeValue, setMarqueeValue] = useState(0);

  const [x, setX] = useState(parseInt(Math.random() * 70 + 5));
  const [y, setY] = useState(parseInt(Math.random() * 70 + 5));
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const t = useRef();

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: `/api/artists/${stage}`,
      responseType: "json",
    }).then((res) => {
      setData(res.data);
      setOnStage(res.data[0]);
      setLoading(false);
    });
  }, [stage]);

  useEffect(() => {
    if (query.index) {
      const nextIndex = Number(query.index);
      if (0 <= nextIndex && nextIndex < data.length) {
        setOnStage(data[nextIndex]);
      }
    }
  }, [data, query]);

  useEffect(() => {
    if (!loading) {
      if (onStage.videos.length === 0) {
        setVideos([{ id: "dZqbLlaRKKc", comments: [""] }]); // should be never broken
      } else {
        setVideos(onStage.videos.sort(() => Math.random() - Math.random()));
      }
    }
  }, [loading, onStage]);

  useEffect(() => {
    if (!loading) {
      if (
        videos &&
        videos[0] &&
        videos[0].comments &&
        videos[0].comments.length > 0
      ) {
        setComments(videos[0].comments);
      } else {
        setComments([""]);
      }
    }
  }, [loading, videos]);

  useEffect(() => {
    if (!loading) {
      const w = comments.map(
        (comment) =>
          parseInt(getTextWidth(comment, "Mont, 16px") * 2) + windowWidth
      );
      setMarqueeValue(w);
      setComIdx(0);
    }
  }, [comments, loading, windowWidth]);

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

  const handleLineupClick = (id) => {
    const nextArtist = data.find((i) => i._id === id);
    history.push(`/stage/${stage}`);
    setOnStage(nextArtist);
  };

  return (
    <Wrapper stage={stage} height={windowHeight}>
      {!loading && (
        <Video>
          <YoutubeWrapper
          // dangerouslySetInnerHTML={getYoutubeIframe(PLAY_DUMMY[stage].id)}
          >
            <YouTube
              width="100%"
              height="100%"
              video={videos[0] && videos[0].id}
              playsInline={true}
            />
          </YoutubeWrapper>
          <Artist>
            <div>{onStage.artist}</div>
          </Artist>
          <Comment width={marqueeValue[comIdx]}>
            <div
              onAnimationIteration={() => {
                setComIdx((v) => (v + 1) % comments.length);
              }}
            >
              {comments[comIdx]}
            </div>
          </Comment>
        </Video>
      )}
      {!loading && isPortrait && (
        <Lineup stage={stage} image={image} x={x} y={y}>
          <LineupWrapper stage={stage}>
            {data.map((artist, idx) => (
              <LineupItem
                key={idx}
                stage={stage}
                onClick={() => {
                  handleLineupClick(artist._id);
                }}
              >
                {artist.artist}
              </LineupItem>
            ))}
          </LineupWrapper>
        </Lineup>
      )}
    </Wrapper>
  );
};

export default Stage;
