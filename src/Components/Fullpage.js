import React, { useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { useMediaQuery } from "react-responsive";
import TimeTable from "./TimeTable";
import Player from "./Player";
import { stageA, stageB, stageC } from "../data";
import Home from "./Home";
import Stage from "./Stage";
import Lineup from "./Lineup";
import Navigation from "./Navigation";

const Fullpage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [play, setPlay] = useState([false, false, false]);

  const afterLoadFn = (origin, destination, direction) => {
    if (destination.index === 0) {
      setPlay([false, false, false]);
    }
  };

  const afterSlideLoadFn = (section, origin, destination, direction) => {
    const newPlay = play.map((v, i) => {
      return i === destination.index ? true : false;
    });
    setPlay(newPlay);
  };

  const renderFn = ({ state, fullpageApi }) => {
    return (
      <ReactFullpage.Wrapper>
        <div className="section">
          <Lineup />
        </div>
        <div className="section active">
          <div className="slide active" data-anchor="slide1">
            <Home />
          </div>
          <div className="slide" data-anchor="slide2">
            <Stage />
          </div>
          <div className="slide" data-anchor="slide3">
            <Stage />
          </div>
          <div className="slide" data-anchor="slide4">
            <Stage />
          </div>
        </div>
        <div className="section">
          <Navigation />
        </div>
      </ReactFullpage.Wrapper>
    );
  };

  return (
    <ReactFullpage
      //fullpage options
      licenseKey="?E?8d8Q#o2"
      scrollingSpeed={800} /* Options here */
      controlArrows={false}
      loopHorizontal={false}
      normalScrollElements="div"
      keyboardScrolling={true}
      //fullpage events
      afterLoad={afterLoadFn}
      afterSlideLoad={afterSlideLoadFn}
      render={renderFn}
    />
  );
};

export default Fullpage;
