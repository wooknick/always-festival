import React, { useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useMediaQuery } from "react-responsive";
import ClipboardJS from "clipboard";
import ReactTooltip from "react-tooltip";
import { Instagram, Twitter, Share } from "./Icons";
import concertImg from "../Images/ambient.svg";

const Wrapper = styled.div`
  z-index: 10;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, 0.5);
  div.myTooltip {
    color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue} !important;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const SliderWrapper = styled.div`
  position: absolute;
  width: 20rem;
  height: 100%;
  background-color: ${(props) =>
    props.color === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  padding: 3rem 2rem 1rem 2rem;
  animation: ${(props) => (props.open ? slideIn : slideOut)} 0.3s linear;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  hr {
    margin-top: 0em;
    margin-bottom: 0.6em;
  }
`;

const SliderItem = styled.div`
  width: 100%;
  height: 1.2em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 0.6em;
  color: white;
  font-family: Varietee;
  &:hover {
    cursor: pointer;
  }
`;

const SliderFooter = styled.div`
  width: 100%;
  min-height: 1.2em;
  flex: 1;
  color: white;
  font-family: Mont;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  div.social {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    a:not(:last-child) {
      margin-right: 0.5em;
    }
    svg {
      width: 2.5rem;
      height: 2.5rem;
      fill: white;
      &:hover {
        cursor: pointer;
      }
    }
  }
  div.copyright {
    font-size: 0.7rem;
    text-align: center;
  }
`;

const Crowd = styled.div`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border: white 2px solid;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    position: absolute;
    width: 70%;
    height: 70%;
    margin-bottom: 0.1em;
  }
  div.forbidden {
    position: absolute;
    width: 0%;
    height: 100%;
    border-right: white 1px solid;
    border-left: white 1px solid;
    transform: rotateZ(45deg);
  }
`;

const CrowdVolume = styled.input`
  margin-left: 1em;
`;

const Slider = ({
  moveTo,
  color,
  isSliderOpen,
  setIsSliderOpen,
  isPlaying,
  toggleCrowd,
  volumeValue,
  setVolumeValue,
}) => {
  const isEnoughHeight = useMediaQuery({ query: "(min-height: 550px)" });
  const shareRef = useRef();

  useEffect(() => {
    const clipboard = new ClipboardJS(shareRef.current);
    return () => {
      clipboard.destroy();
    };
  }, []);
  return (
    <Wrapper
      color={color}
      onClick={() => {
        setIsSliderOpen(false);
      }}
    >
      <SliderWrapper
        open={isSliderOpen}
        color={color}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <SliderItem
          onClick={() => {
            moveTo("/");
          }}
        >
          Entrance
        </SliderItem>
        <div>
          <hr />
        </div>
        <SliderItem
          onClick={() => {
            moveTo("/stage/red");
          }}
        >
          Red Stage
        </SliderItem>
        <SliderItem
          onClick={() => {
            moveTo("/stage/blue");
          }}
        >
          Blue Stage
        </SliderItem>
        <div>
          <hr />
        </div>
        <SliderItem
          onClick={() => {
            moveTo("/info");
          }}
        >
          Information
        </SliderItem>
        <SliderItem
          onClick={() => {
            moveTo("/contact");
          }}
        >
          Contact Us
        </SliderItem>
        <SliderItem>
          <Crowd onClick={toggleCrowd}>
            <img src={concertImg} alt="concertImg" />
            {!isPlaying && <div className="forbidden"></div>}
          </Crowd>
          <CrowdVolume
            onChange={(e) => {
              setVolumeValue(Number(e.target.value));
            }}
            type="range"
            step="0.01"
            min="0"
            max="1"
            value={volumeValue}
          />
        </SliderItem>
        <SliderFooter>
          <div className="social">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/always_fest/"
            >
              <Instagram />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/always_fest"
            >
              <Twitter />
            </a>
            <div
              ref={shareRef}
              data-tip="Link Copied"
              data-clipboard-text="https://www.alwaysfestival.com/"
            >
              <Share />
            </div>
          </div>
          {isEnoughHeight && (
            <div className="copyright">
              &copy; 2022. Weavers Lab all rights reserved.
            </div>
          )}
        </SliderFooter>
      </SliderWrapper>
      <ReactTooltip
        place="top"
        effect="solid"
        event="click"
        eventOff="mouseout"
        delayHide={1000}
        textColor="blue"
        backgroundColor="white"
        className="myTooltip"
      />
    </Wrapper>
  );
};

export default Slider;
