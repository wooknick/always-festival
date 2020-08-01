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
import Home from "./Home";
import Header from "./Header";
import Stage from "./Stage";

import "./fonts/DiscoDiva/font.css";
import "./fonts/Retrock/font.css";
import "./fonts/Variete/font.css";
dotenv.config();

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
