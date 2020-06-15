import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import Home from "./Home";
import Theme from "../Styles/Theme";
import styled, { ThemeProvider } from "styled-components";

const Landscape = styled.div`
  @media screen and (max-height: 475px) {
    visibility: visible;
  }
  visibility: hidden;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: white;
  color: #061820;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    font-size: 40px;
    font-weight: bold;
    font-family: "Great Vibes", cursive;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Landscape>
          <div>Invitation</div>
        </Landscape>
        <Home />
      </>
    </ThemeProvider>
  );
};

export default App;
