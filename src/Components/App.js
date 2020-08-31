import dotenv from "dotenv";
import React, { useState, useEffect } from "react";
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
import Info from "./Info";
import Contact from "./Contact";
import ColorContext from "./ColorContext";

import "./fonts/DiscoDiva/font.css";
import "./fonts/Retrock/font.css";
import "./fonts/Variete/font.css";

dotenv.config();

const App = () => {
  const [fontSize, setFontSize] = useState("16px");
  const isMediumWidth = useMediaQuery({ query: "(max-width: 413px)" });
  const isMediumHeight = useMediaQuery({ query: "(max-height: 413px)" });
  const isMedium = isMediumWidth || isMediumHeight;
  const isSmallWidth = useMediaQuery({ query: "(max-width: 374px)" });
  const isSmallHeight = useMediaQuery({ query: "(max-height: 374px)" });
  const isSmall = isSmallWidth || isSmallHeight;

  const [color, setColor] = useState(
    new Date().getSeconds() % 2 === 1 ? "red" : "blue"
  );

  useEffect(() => {
    if (isSmall) {
      setFontSize("12px");
    } else if (isMedium) {
      setFontSize("13px");
    } else {
      setFontSize("16px");
    }
  }, [isMedium, isSmall]);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles bodyFont={fontSize} />
        <Router>
          <>
            <ColorContext.Provider value={{ color, setColor }}>
              <Header />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/stage/:stage" component={Stage} />
                <Route path="/info" component={Info} />
                <Route path="/contact" component={Contact} />
                <Redirect from="*" to="/" />
              </Switch>
            </ColorContext.Provider>
          </>
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;
