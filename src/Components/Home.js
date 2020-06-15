import React, { useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { useMediaQuery } from "react-responsive";
import TimeTable from "./TimeTable";
import Player from "./Player";
import { stageA, stageB, stageC } from "../data";
import Ticket from "./Ticket";

const Home = () => {
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
        {isMobile ? (
          <div className="section">
            <Ticket />
          </div>
        ) : (
          <>
            <div className="section">
              <TimeTable
                screen="desktop"
                state={state}
                fullpageApi={fullpageApi}
              />
            </div>
            <div className="section">
              <div className="slide" data-anchor="slide1">
                <Player
                  stageNo={0}
                  fullpageApi={fullpageApi}
                  play={play[0]}
                  data={stageA}
                />
              </div>
              <div className="slide active" data-anchor="slide2">
                <Player
                  stageNo={1}
                  fullpageApi={fullpageApi}
                  play={play[1]}
                  data={stageB}
                />
              </div>
              <div className="slide" data-anchor="slide3">
                <Player
                  stageNo={2}
                  fullpageApi={fullpageApi}
                  play={play[2]}
                  data={stageC}
                />
              </div>
            </div>
          </>
        )}
      </ReactFullpage.Wrapper>
    );
  };

  return (
    <ReactFullpage
      //fullpage options
      licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
      scrollingSpeed={800} /* Options here */
      controlArrows={false}
      loopHorizontal={false}
      normalScrollElements="div"
      keyboardScrolling={false}
      //fullpage events
      afterLoad={afterLoadFn}
      afterSlideLoad={afterSlideLoadFn}
      render={renderFn}
    />
  );
};

export default Home;
