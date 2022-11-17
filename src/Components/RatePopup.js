import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FullBeer } from "./Icons";

const Wrapper = styled.div`
  z-index: 10;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RatePopupWrapper = styled.div`
  width: 22rem;
  height: 25rem;
  max-height: 70vh;
  background-color: white;
  padding: 3rem 2rem;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  span {
    text-align: center;
    font-size: 2rem;
    font-family: Mont;
    font-weight: bold;
    color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
  }
`;

const Thanks = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  span {
    color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
    text-align: center;
    font-size: 1.5rem;
    font-family: Mont;
    line-height: 1.5em;
  }
`;

const Beers = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  label {
    opacity: 1;
    &:hover {
      cursor: pointer;
    }
  }
  .rating__input:checked ~ .rating__label {
    opacity: 0.4;
  }
  input {
    display: none;
  }
  svg {
    fill: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
  }
`;

const Button = styled.div`
  width: 10rem;
  height: 3rem;
  font-family: Mont;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.color === "red"
      ? props.theme.color.mainRed
      : props.theme.color.mainBlue};
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const RatePopup = ({ color, setShowRatePopup, stage, setCookie }) => {
  const [beforeSubmit, setBeforSubmit] = useState(true);
  const scoreRef = useRef();
  useEffect(() => {
    if (scoreRef.current) {
      scoreRef.current.checked = true;
    }
  }, []);

  const handleSubmit = () => {
    let today = new Date();
    let tomorrow = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() + 1,
        0,
        0,
        0,
        0
      )
    );
    setCookie(`submitScore${stage}`, true, { expires: tomorrow });
    setBeforSubmit(false);
  };

  const handleClose = () => {
    setShowRatePopup(false);
  };

  const handleWrapper = () => {
    setShowRatePopup(false);
  };

  return (
    <Wrapper onClick={handleWrapper}>
      <RatePopupWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title color={color}>
          <span>Enjoying this stage?</span>
        </Title>
        {beforeSubmit ? (
          <Beers color={color}>
            <label htmlFor="score1" className="rating__label">
              <FullBeer size={40} />
            </label>
            <input
              type="radio"
              id="score1"
              name="score"
              className="rating__input"
              value={1}
              ref={scoreRef}
            />
            <label htmlFor="score2" className="rating__label">
              <FullBeer size={40} />
            </label>
            <input
              type="radio"
              id="score2"
              name="score"
              className="rating__input"
              value={2}
            />
            <label htmlFor="score3" className="rating__label">
              <FullBeer size={40} />
            </label>
            <input
              type="radio"
              id="score3"
              name="score"
              className="rating__input"
              value={3}
            />
            <label htmlFor="score4" className="rating__label">
              <FullBeer size={40} />
            </label>
            <input
              type="radio"
              id="score4"
              name="score"
              className="rating__input"
              value={4}
            />
            <label htmlFor="score5" className="rating__label">
              <FullBeer size={40} />
            </label>
            <input
              type="radio"
              id="score5"
              name="score"
              className="rating__input"
              value={5}
            />
          </Beers>
        ) : (
          <Thanks color={color}>
            <span>Thanks for your feedback :)</span>
          </Thanks>
        )}
        {beforeSubmit ? (
          <Button color={color} onClick={handleSubmit}>
            <span>Submit</span>
          </Button>
        ) : (
          <Button color={color} onClick={handleClose}>
            <span>Close</span>
          </Button>
        )}
      </RatePopupWrapper>
    </Wrapper>
  );
};

export default RatePopup;
