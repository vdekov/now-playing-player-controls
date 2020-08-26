import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Device from '../utils';
import VolumeControl from './VolumeControl';
import ProgressBar from './ProgressBar';
import { Globe, Play, Pause, Replay } from './Icons';

const ControlsOverlay = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: rgba(45, 40, 103, 0.5);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s;
`;
const VolumeControlWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
const GlobeButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  cursor: pointer;
`;
const PlayControls = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const PlayButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
const BottomControls = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 8px;
  user-select: none;
`;
const Timer = styled.span`
  color: #fff;
`;
const SliderWrapper = styled.div`
  width: 100%;
  margin: 0 8px;
`;

interface Props {
  visible?: boolean;
  hide: () => void;
  showMap: () => void;
}

const PlayerControls: React.FC<Props> = ({
  visible = false,
  hide,
  showMap
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playControlsEl = useRef(null);
  const isMobileDevice = Device.isMobileDevice();

  const hideControls = (event) => {
    if (!isMobileDevice) {
      return;
    }
    if (playControlsEl.current === event.target) {
      hide();
    }
  };

  const togglePlay = (event) => {
    event.preventDefault();
    setIsPlaying(!isPlaying);
  };

  const showWorldMap = (event) => {
    event.preventDefault();
    showMap();
  };

  return (
    <ControlsOverlay isVisible={visible} onClick={hideControls}>
      <PlayControls ref={playControlsEl}>
        <PlayButtonsWrapper onMouseDown={togglePlay} onTouchEnd={togglePlay}>
          {isPlaying ? <Pause /> : <Play />}
        </PlayButtonsWrapper>
      </PlayControls>
      {!isMobileDevice && (
        <VolumeControlWrapper>
          <VolumeControl />
        </VolumeControlWrapper>
      )}
      <GlobeButton onMouseDown={showWorldMap} onTouchEnd={showWorldMap}>
        <Globe />
      </GlobeButton>
      <BottomControls>
        <Timer>00:00</Timer>
        <SliderWrapper>
          <ProgressBar />
        </SliderWrapper>
        <Timer>00:00</Timer>
      </BottomControls>
    </ControlsOverlay>
  );
};

export default PlayerControls;
