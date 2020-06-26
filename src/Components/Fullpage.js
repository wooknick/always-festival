import React, { useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { stageA, stageB, stageC } from "../data";
import Home from "./Home";
import Stage from "./Stage";
import Lineup from "./Lineup";
import Navigation from "./Navigation";
import DataContext from "./DataContext";

const Fullpage = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [activeSlide, setActiveSlide] = useState("home");
  const [activeData, setActiveData] = useState(stageA);

  const [activeStageA, setActiveStageA] = useState(
    Math.floor(Math.random() * 6)
  );
  const [activeStageB, setActiveStageB] = useState(
    Math.floor(Math.random() * 6)
  );
  const [activeStageC, setActiveStageC] = useState(
    Math.floor(Math.random() * 6)
  );
  const [lineupStageA, setLineupStageA] = useState(stageA.slice(0, 6));
  const [lineupStageB, setLineupStageB] = useState(stageB.slice(0, 6));
  const [lineupStageC, setLineupStageC] = useState(stageC.slice(0, 6));

  const contextData = {
    activeStageA,
    setActiveStageA,
    activeStageB,
    setActiveStageB,
    activeStageC,
    setActiveStageC,
    lineupStageA,
    lineupStageB,
    lineupStageC,
  };

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
        <div className="section">
          <Lineup from={activeSlide} data={activeData} />
        </div>
        <div className="section active">
          <div className="slide active" data-anchor="home">
            <Home fullpageApi={fullpageApi} />
          </div>
          <div className="slide" data-anchor="stageA">
            <Stage
              fullpageApi={fullpageApi}
              from={activeSlide}
              data={lineupStageA[activeStageA]}
              fixed={"stageA"}
            />
          </div>
          <div className="slide" data-anchor="stageB">
            <Stage
              fullpageApi={fullpageApi}
              from={activeSlide}
              data={lineupStageB[activeStageB]}
              fixed={"stageB"}
            />
          </div>
          <div className="slide" data-anchor="stageC">
            <Stage
              fullpageApi={fullpageApi}
              from={activeSlide}
              data={lineupStageC[activeStageC]}
              fixed={"stageC"}
            />
          </div>
        </div>
        <div className="section">
          <Navigation fullpageApi={fullpageApi} from={activeSlide} />
        </div>
      </ReactFullpage.Wrapper>
    );
  };

  return (
    <DataContext.Provider value={contextData}>
      <ReactFullpage
        //fullpage options
        licenseKey="?E?8d8Q#o2"
        scrollingSpeed={800} /* Options here */
        controlArrows={false}
        loopHorizontal={false}
        // normalScrollElements="div.clickable"
        keyboardScrolling={true}
        //fullpage events
        onLeave={handleOnLeave}
        onSlideLeave={handleOnSlideLeave}
        render={renderFn}
      />
    </DataContext.Provider>
  );
};

export default Fullpage;
