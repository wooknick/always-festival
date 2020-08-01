import React from "react";
import styled, { keyframes } from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { useState } from "react";

const Header = styled.header`
  width: 100%;
  height: 3.5rem;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 0 1em;
  position: fixed;
  top: 0;
  background-color: #fff;
`;

const Menu = styled.div`
  font-size: 2rem;
  flex: ${(props) => (props.isHome ? 0.15 : 0.3)};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.3em;
  div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotateZ(90deg);
    min-width: 32px;
    width: max-content;
    /* margin: 0 auto; */
    color: ${(props) =>
      props.stage === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
    &:hover {
      cursor: pointer;
    }
  }

  div.stage {
    width: max-content;
    /* margin: 0 auto; */
    margin-left: 0.7em;
    font-family: Varietee;
    padding-top: 0.2em;
    color: ${(props) =>
      props.stage === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
    span:nth-child(1) {
      &::after {
        content: " ";
      }
    }
  }
`;

const Slider = styled.div`
  z-index: 10;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, 0.5);
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
    props.stage === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  padding: 3rem 2rem;
  animation: ${(props) => (props.open ? slideIn : slideOut)} 0.3s linear;
`;

const SliderItem = styled.div`
  width: 100%;
  height: 1.2em;
  font-size: 2rem;
  margin-bottom: 0.6em;
  color: white;
  font-family: Varietee;
  text-align: right;
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  flex: 0.7;
  div.main {
    width: max-content;
    margin: 0 auto;
    font-family: Varietee;
    padding-top: 0.2em;
    span:nth-child(1) {
      color: ${(props) => props.theme.color.mainBlue};
      &::after {
        content: " ";
      }
    }
    span:nth-child(2) {
      color: ${(props) => props.theme.color.mainRed};
    }
  }
`;

export default withRouter(({ history, match }) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  let stage = Math.random() > 0.5 ? "red" : "blue";
  if (!match.isExact) {
    stage = history.location.pathname.split("/").pop();
  }

  const moveTo = (to) => {
    history.push(to);
    setIsSliderOpen(false);
  };

  return (
    <>
      {match.isExact ? (
        <Header>
          <Menu
            stage={stage}
            isHome={match.isExact}
            onClick={() => {
              setIsSliderOpen(true);
            }}
          >
            <div>|||</div>
          </Menu>
          <Logo stage={stage}>
            <div className="main">
              <span>Always</span>
              <span>Festival</span>
            </div>
          </Logo>
        </Header>
      ) : (
        <Header>
          <Menu
            stage={stage}
            isHome={match.isExact}
            onClick={() => {
              setIsSliderOpen(true);
            }}
          >
            <div>|||</div>
            <div className="stage">
              <span>{stage}</span>
              <span>stage</span>
            </div>
          </Menu>
        </Header>
      )}
      {isSliderOpen && (
        <Slider
          onClick={() => {
            setIsSliderOpen(false);
          }}
        >
          <SliderWrapper
            open={isSliderOpen}
            stage={stage}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <SliderItem
              onClick={() => {
                moveTo("/");
              }}
            >
              Home
            </SliderItem>
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
          </SliderWrapper>
        </Slider>
      )}
    </>
  );
});
