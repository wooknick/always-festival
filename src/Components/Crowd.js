import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useSound from "use-sound";
import crowdSound from "../Sounds/crowd.wav";
import concert from "../Images/concert.svg";

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  border: white 2px solid;
  border-radius: 25px;
  img {
    width: 50px;
    height: 50px;
  }
`;

const Crowd = () => {
  const [isPlaying, setIsPlaying] = useState();
  const [play, { stop }] = useSound(crowdSound);

  useEffect(() => {
    setIsPlaying(true);
    play();
    return () => {
      stop();
    };
  }, [play, stop]);

  return (
    <Wrapper
      onClick={() => {
        if (isPlaying) {
          console.log(isPlaying);
          stop();
          setIsPlaying(false);
        } else {
          console.log(isPlaying);
          play();
          setIsPlaying(true);
        }
      }}
    >
      <img src={concert} alt="concert" />
    </Wrapper>
  );
};

export default Crowd;
