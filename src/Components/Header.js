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
  transform: rotateZ(90deg);
  flex: 0.1;
  div {
    width: max-content;
    margin: 0 auto;
    color: ${(props) => props.theme.color.mainRed};
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  flex: 0.8;
  div {
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

export default withRouter(({ history }) => {
  return (
    <Header>
      <Menu>
        <div>|||</div>
      </Menu>
      <Logo>
        <div>
          <span>Always</span>
          <span>Festival</span>
        </div>
      </Logo>
    </Header>
  );
});
