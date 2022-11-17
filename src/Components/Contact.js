import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com";
import ColorContext from "./ColorContext";
import useInput from "../Hooks/useInput";

const Wrapper = styled.div`
  padding-top: 3.5rem;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  height: ${(props) => props.height}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: Mont;
`;

const ContactInfo = styled.div`
  width: 100%;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
    font-size: 3rem;
    line-height: 1.4em;
  }
  a {
    color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
    font-weight: bold;
  }
  margin-bottom: 2rem;
`;

const Contact = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  const { color } = useContext(ColorContext);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Wrapper
      height={windowHeight}
      width={windowWidth}
      isPortrait={isPortrait}
      color={color}
    >
      <ContactInfo color={color}>
        <span>
          <a href="https://weaverslab.co.kr/">Weavers Lab</a>
        </span>
      </ContactInfo>
    </Wrapper>
  );
};

export default Contact;
