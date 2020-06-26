import React, { useState, useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Home from "./Home";
import Stage from "./Stage";
import Lineup from "./Lineup";
import Navigation from "./Navigation";
import DataContext from "./DataContext";
import axios from "axios";

const Fullpage = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [activeSlide, setActiveSlide] = useState("home");
  const [activeData, setActiveData] = useState();

  const [activeStageA, setActiveStageA] = useState(
    Math.floor(Math.random() * 6)
  );
  const [activeStageB, setActiveStageB] = useState(
    Math.floor(Math.random() * 6)
  );
  const [activeStageC, setActiveStageC] = useState(
    Math.floor(Math.random() * 6)
  );
  const [lineupStageA, setLineupStageA] = useState();
  const [lineupStageB, setLineupStageB] = useState();
  const [lineupStageC, setLineupStageC] = useState();

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

  useEffect(() => {
    const getData = async () => {
      const dataURL = `https://raw.githubusercontent.com/wooknick/always-festival/master/src/test.json`;
      // const dataURL = `https://api.jsonbin.io/b/5ef6047f2406353b2e0d2198`;
      try {
        const response = await axios.get(dataURL);
        // const response = await axios.get(dataURL, {
        //   headers: {
        //     "secret-key":
        //       "$2b$10$FkX1bXeCxRlkUGRGfBu3aeanaE7yTFWWk6vzAHixPsEUbYTvcP5.G",
        //   },
        // });
        const { data } = response;
        setLineupStageA(data.stageA.slice(0, 6));
        setLineupStageB(data.stageB.slice(0, 6));
        setLineupStageC(data.stageC.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleOnLeave = (origin, destination, direction) => {
    if (activeSlide === "home" && destination.index === 0) {
      return false;
    }
    setActiveSection(destination);
  };

  const handleOnSlideLeave = (section, origin, destination, direction) => {
    setActiveSlide(destination.anchor);
    if (destination.anchor === "stageA") {
      setActiveData(lineupStageA);
    } else if (destination.anchor === "stageB") {
      setActiveData(lineupStageB);
    } else if (destination.anchor === "stageC") {
      setActiveData(lineupStageC);
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
              data={lineupStageA && lineupStageA[activeStageA]}
              fixed={"stageA"}
            />
          </div>
          <div className="slide" data-anchor="stageB">
            <Stage
              fullpageApi={fullpageApi}
              from={activeSlide}
              data={lineupStageB && lineupStageB[activeStageB]}
              fixed={"stageB"}
            />
          </div>
          <div className="slide" data-anchor="stageC">
            <Stage
              fullpageApi={fullpageApi}
              from={activeSlide}
              data={lineupStageC && lineupStageC[activeStageC]}
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
