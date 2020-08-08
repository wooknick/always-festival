import dotenv from "dotenv";
import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import { ThemeProvider } from "styled-components";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Home from "./Home";
import Header from "./Header";
import Stage from "./Stage";

import "./fonts/DiscoDiva/font.css";
import "./fonts/Retrock/font.css";
import "./fonts/Variete/font.css";
import Info from "./Info";
dotenv.config();

const App = () => {
  const isSmallWidth = useMediaQuery({ query: "(max-width: 413px)" });
  const isSmallHeight = useMediaQuery({ query: "(max-height: 375px)" });
  const isSmall = isSmallWidth || isSmallHeight;

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles bodyFont={isSmall ? "12px" : "16px"} />
        <Router>
          <>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/stage/:stage" component={Stage} />
              <Route path="/info" component={Info} />
              <Redirect from="*" to="/" />
            </Switch>
          </>
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;
