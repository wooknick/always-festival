import dotenv from "dotenv";
import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import styled, { ThemeProvider } from "styled-components";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Stage from "./Stage";

import "./fonts/DiscoDiva/font.css";
import "./fonts/Retrock/font.css";
import "./fonts/Variete/font.css";
dotenv.config();

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
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            <Header />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/stage/:stage" component={Stage} />
              <Redirect from="*" to="/" />
            </Switch>
          </>
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;
