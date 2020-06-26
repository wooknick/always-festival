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
  const [activeSection, setActiveSection] = useState(1);
  const [activeSlide, setActiveSlide] = useState("home");
  const [activeData, setActiveData] = useState(stageA);

  const handleOnLeave = (origin, destination, direction) => {
    if (activeSlide === "home" && destination.index === 0) {
      return false;
    }

    setActiveSection(destination);
  };

  const handleOnSlideLeave = (section, origin, destination, direction) => {
    setActiveSlide(destination.anchor);
    if (destination.anchor === "stageA") {
      setActiveData(stageA);
    } else if (destination.anchor === "stageB") {
      setActiveData(stageB);
    } else if (destination.anchor === "stageC") {
      setActiveData(stageC);
    }
  };

  const renderFn = ({ state, fullpageApi }) => {
    return (
      <ReactFullpage.Wrapper>
        <div className="section active">
          <Lineup from={activeSlide} data={activeData} />
        </div>
        <div className="section">
          <div className="slide active" data-anchor="home">
            <Home fullpageApi={fullpageApi} />
          </div>
          <div className="slide" data-anchor="stageA">
            <Stage fullpageApi={fullpageApi} from={activeSlide} data={stageA} />
          </div>
          <div className="slide" data-anchor="stageB">
            <Stage fullpageApi={fullpageApi} from={activeSlide} data={stageB} />
          </div>
          <div className="slide" data-anchor="stageC">
            <Stage fullpageApi={fullpageApi} from={activeSlide} data={stageC} />
          </div>
        </div>
        <div className="section">
          <Navigation fullpageApi={fullpageApi} from={activeSlide} />
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
      // normalScrollElements="div"
      keyboardScrolling={true}
      //fullpage events
      // afterLoad={afterLoadFn}
      // afterSlideLoad={afterSlideLoadFn}
      onLeave={handleOnLeave}
      onSlideLeave={handleOnSlideLeave}
      render={renderFn}
    />
  );
};

export default Fullpage;
