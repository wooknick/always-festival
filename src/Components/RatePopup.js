import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { FullBeer, EmptyBeer } from "./Icons";

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
  const [score, setScore] = useState(1);
  const scoreRef = useRef();
  useEffect(() => {
    if (scoreRef.current) {
      scoreRef.current.checked = true;
    }
  }, []);

  const handleScore = (e) => {
    setScore(e.target.value);
  };

  const handleSubmit = () => {
    axios({
      method: "put",
      url: `/api/score/${stage}?value=${score}`,
      responseType: "json",
    });
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
          <span>Enjoy this stage?</span>
        </Title>
        {beforeSubmit ? (
          <Beers color={color}>
            <label for="score1" class="rating__label">
              <FullBeer size={40} />
            </label>
            <input
              type="radio"
              id="score1"
              name="score"
              class="rating__input"
              onClick={handleScore}
              value={1}
              ref={scoreRef}
            />
            <label for="score2" class="rating__label">
              <FullBeer size={40} />
            </label>
            <input
              type="radio"
              id="score2"
              name="score"
              class="rating__input"
              onClick={handleScore}
              value={2}
            />
            <label for="score3" class="rating__label">
              <FullBeer size={40} />
            </label>
            <input
              type="radio"
              id="score3"
              name="score"
              class="rating__input"
              onClick={handleScore}
              value={3}
            />
            <label for="score4" class="rating__label">
              <FullBeer size={40} />
            </label>
            <input
              type="radio"
              id="score4"
              name="score"
              class="rating__input"
              onClick={handleScore}
              value={4}
            />
            <label for="score5" class="rating__label">
              <FullBeer size={40} />
            </label>
            <input
              type="radio"
              id="score5"
              name="score"
              class="rating__input"
              onClick={handleScore}
              value={5}
            />
          </Beers>
        ) : (
          <Thanks color={color}>
            <span>Thank you for your feedback:)</span>
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
