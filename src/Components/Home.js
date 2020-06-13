import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { useMediaQuery } from "react-responsive";
import TimeTable from "./TimeTable";
import Player from "./Player";

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <ReactFullpage
      //fullpage options
      licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
      scrollingSpeed={800} /* Options here */
      controlArrows={false}
      loopHorizontal={false}
      dragAndMove={true}
      normalScrollElements="div"
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              {isMobile ? (
                <TimeTable screen="mobile" fullpageApi={fullpageApi} />
              ) : (
                <TimeTable screen="desktop" fullpageApi={fullpageApi} />
              )}
            </div>
            <div className="section">
              <div className="slide" data-anchor="slide1">
                <Player stageNo={0} fullpageApi={fullpageApi} />
              </div>
              <div className="slide active" data-anchor="slide2">
                <Player stageNo={1} fullpageApi={fullpageApi} />
              </div>
              <div className="slide" data-anchor="slide3">
                <Player stageNo={2} fullpageApi={fullpageApi} />
              </div>
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default Home;
