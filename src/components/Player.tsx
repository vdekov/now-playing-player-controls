import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PlayerControls from './PlayerControls';
import UnmuteButton from './UnmuteButton';
import WorldMap from './WorldMap';

const PlayerContainer = styled.div`
  position: relative;
  max-width: 464px;
  max-height: 464px;
  border-radius: 8px;
  overflow: hidden;
`;
const VideoPlayer = styled.div`
  display: flex;
`;
const CoverPhoto = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

let controlsTimeout;

const Player = () => {
  const [areControlsVisible, setAreControlsVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const playerContainerEl = useRef(null);

  const showControls = () => {
    setAreControlsVisible(true);
  };

  const hideControls = () => {
    setAreControlsVisible(false);
    // TODO: Clear timeout only on mobile device
    window.clearTimeout(controlsTimeout);
  };

  const showMobileControls = () => {
    showControls();
    window.clearTimeout(controlsTimeout);
    controlsTimeout = window.setTimeout(hideControls, 2000);
  };

  // TODO: Attach touch events only on touch devices
  const onTouchMove = () => {
    showMobileControls();
  };

  const onTouchEnd = (event) => {
    if (!areControlsVisible) {
      event.preventDefault();
    }
    showMobileControls();
    // In case audio is muted - turn it on
    if (isMuted) {
      unmuteAudio(event);
    }
  };

  const unmuteAudio = (event) => {
    event.stopPropagation();
    setIsMuted(false);
  };

  const showWorldMap = () => {
    setIsMapVisible(true);
  };

  const hideWorldMap = (event) => {
    event.preventDefault();
    // hideControls();
    setIsMapVisible(false);
  };

  return (
    <PlayerContainer
      ref={playerContainerEl}
      onMouseOver={showControls}
      onMouseOut={hideControls}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <VideoPlayer>
        <CoverPhoto src="./video-thumbnail.jpg" alt="" />
      </VideoPlayer>
      <PlayerControls
        visible={areControlsVisible}
        showMap={showWorldMap}
        hide={hideControls}
      />
      <UnmuteButton muted={isMuted} onClick={unmuteAudio} />
      <WorldMap visible={isMapVisible} onClose={hideWorldMap} />
    </PlayerContainer>
  );
};

export default Player;
