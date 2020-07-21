import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

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
  flex: 0.1;
  display: flex;
  justify-content: flex-start;
  margin-left: 0.3em;
  div {
    transform: rotateZ(90deg);
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
`;

const Logo = styled.div`
  font-size: 1.8rem;
  flex: 0.8;
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
  div.stage {
    width: max-content;
    /* margin: 0 auto; */
    margin-left: 0.5em;
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

export default withRouter(({ history, match }) => {
  let stage = Math.random() > 0.5 ? "red" : "blue";
  console.log(stage);
  if (!match.isExact) {
    stage = history.location.pathname.split("/").pop();
  }
  return (
    <Header>
      <Menu stage={stage}>
        <Link>
          <div>|||</div>
        </Link>
      </Menu>
      <Logo stage={stage}>
        <Link to="/">
          {match.isExact && (
            <div className="main">
              <span>Always</span>
              <span>Festival</span>
            </div>
          )}
          {!match.isExact && (
            <div className="stage">
              <span>{stage}</span>
              <span>stage</span>
            </div>
          )}
        </Link>
      </Logo>
    </Header>
  );
});
