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
  height: 12rem;
  display: flex;
  align-items: flex-end;
  span {
    color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
    font-size: 1.4rem;
    line-height: 1.4em;
  }
  margin-bottom: 2rem;
`;

const Form = styled.form`
  font-family: Mont;
  width: 100%;
  padding: 0 2rem;
  height: 70%;
  align-items: center;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
  input {
    margin-bottom: 1em;
    border: ${(props) =>
        props.color === "red"
          ? props.theme.color.mainRed
          : props.theme.color.mainBlue}
      1px solid;
  }
  textarea {
    margin-bottom: 1em;
    border: ${(props) =>
        props.color === "red"
          ? props.theme.color.mainRed
          : props.theme.color.mainBlue}
      1px solid;
  }
  button {
    background-color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
  }
`;

const Input = styled.input`
  width: 100%;
  height: 2.5em;
  background-color: white;
  font-size: 1rem;
  font-family: Mont;
  padding: 0 1em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 15rem;
  font-size: 1rem;
  resize: none;
  font-family: Mont;
  padding: 1em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
`;

const Submit = styled.button`
  width: 100%;
  height: 3rem;
  color: white;
  border: none;
  font-family: Mont;
  font-weight: 500;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
  }
`;

const SendOkMessage = styled.div`
  width: 100%;
  padding: 0 2rem;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
  span {
    color: ${(props) =>
      props.color === "red"
        ? props.theme.color.mainRed
        : props.theme.color.mainBlue};
    font-size: 2rem;
    line-height: 1.4em;
  }
`;

const Contact = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const [sendOk, setSendOk] = useState(false);

  const { color, setColor } = useContext(ColorContext);

  const name = useInput("");
  const email = useInput("");
  const message = useInput("");

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

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "default_service",
        "template_1FvfKCo7",
        e.target,
        "user_25iHW85rnyM6eq06QaFvE"
      )
      .then(
        (result) => {
          setSendOk(true);
        },
        (error) => {
          setSendOk(true);
        }
      );
  };

  return (
    <Wrapper
      height={windowHeight}
      width={windowWidth}
      isPortrait={isPortrait}
      color={color}
    >
      <ContactInfo color={color}>
        <span>
          To improve our service, we need your honest opinion. Please feel free
          and leave your comments on the form below.
        </span>
      </ContactInfo>
      {sendOk ? (
        <SendOkMessage color={color}>
          <span>Thank you for your feedback!</span>
        </SendOkMessage>
      ) : (
        <Form color={color} className="contactForm" onSubmit={sendEmail}>
          <Input
            {...name}
            placeholder="Name(required)"
            name="from_name"
            required
          />
          <Input
            {...email}
            placeholder="Your email address(optional)"
            name="reply_to"
          />
          <Textarea
            {...message}
            placeholder="Message(required)"
            name="message_html"
            required
          />
          <Submit>Submit</Submit>
        </Form>
      )}
    </Wrapper>
  );
};

export default Contact;
