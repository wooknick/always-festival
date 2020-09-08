import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import StageBlue from "../Images/StageBlue.png";
import StageRed from "../Images/StageRed.png";
import { FullBeer, EmptyBeer } from "./Icons";

const WaveFrame = (x, y) => keyframes`
0%, 100%{
  background-position-x: ${x - 4}%;
}
50%{
  background-position-x: ${x + 4}%;
}
`;

const WaveAnimation = (x, y) => css`
  animation: ${WaveFrame(x, y)} ${Math.random() * 3 + 12}s linear infinite;
`;

const Pattern = styled.div`
  width: 100%;
  height: ${(props) => (props.isPortrait ? props.ratio : 100)}%;
  background-image: url(${(props) => props.image});
  background-size: 250%;
  background-position-x: ${(props) => props.x}%;
  background-position-y: ${(props) => props.y}%;
  padding: 1.5rem;
  ${(props) => WaveAnimation(props.x, props.y)};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  color: ${(props) =>
    props.stage === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  text-transform: uppercase;
  font-family: DiscoDiva;
  -webkit-text-stroke: 2px;
  text-align: center;
  line-height: 1.4em;
`;

const Rate = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
`;

const Beer = styled.div`
  flex: 0.7;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  svg {
    margin-right: 0.5rem;
    fill: ${(props) =>
      props.stage === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
  }
`;

const Score = styled.div`
  flex: 0.2;
  font-size: 2rem;
  font-family: Mont;
  font-weight: bold;
`;

const Entrance = ({ stage, ratio, isPortrait, height, width }) => {
  const image = stage === "red" ? StageRed : StageBlue;
  const x = parseInt(Math.random() * 70 + 5);
  const y = parseInt(Math.random() * 70 + 5);
  const [rate, setRate] = useState(0);
  const [rateArr, setRateArr] = useState([-1, -1, -1, -1, -1]);
  const [iconSize, setIconSize] = useState(24);
  const titleRef = useRef();

  useEffect(() => {
    axios({
      method: "get",
      url: `/api/rate/${stage}`,
      responseType: "json",
    }).then((res) => {
      const newRate = res.data["rate"];
      const newRateArr = [];
      for (let i = 0; i < 5; i++) {
        if (newRate - i > 1) {
          newRateArr.push(1);
        } else if (newRate - i > 0) {
          newRateArr.push(0);
        } else {
          newRateArr.push(-1);
        }
      }
      setRate(newRate);
      setRateArr(newRateArr);
    });
  }, [stage]);

  useEffect(() => {
    if ((!isPortrait && width <= 667) || (isPortrait && height <= 667)) {
      setIconSize(20);
    } else {
      setIconSize(24);
    }
  }, [height, isPortrait, width]);

  return (
    <Pattern
      stage={stage}
      ratio={ratio}
      isPortrait={isPortrait}
      image={image}
      x={x}
      y={y}
    >
      <Link to={`/stage/${stage}`}>
        <Wrapper stage={stage}>
          <Title ref={titleRef}>
            <span>{stage} stage</span>
            <Rate>
              <Beer stage={stage}>
                {rateArr.map((r) => {
                  if (r === 1) {
                    return <FullBeer size={iconSize} />;
                  } else if (r === 0) {
                    return <EmptyBeer size={iconSize} />;
                  }
                })}
              </Beer>
              <Score>{rate}</Score>
            </Rate>
          </Title>
        </Wrapper>
      </Link>
    </Pattern>
  );
};

export default Entrance;
