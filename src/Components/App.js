import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import Home from "./Home";
import Theme from "../Styles/Theme";
import { ThemeProvider } from "styled-components";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Home />
      </>
    </ThemeProvider>
  );
};

export default App;
