import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { SoundOn, SoundOff } from './Icons';
import Slider from './Slider';

const INITIAL_VOLUME = 0.7;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
`;
const SoundIconWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 24px;
  height: 100%;
  padding: 0 8px 0 12px;
  cursor: pointer;
`;
const VolumeSliderWrapper = styled.div<{ isDisplayed: boolean }>`
  width: ${(props) => (props.isDisplayed ? 70 : 0)}px;
  opacity: ${(props) => (props.isDisplayed ? 1 : 0)};
  transition: width 0.3s, opacity 0.3s;
`;

const VolumeControl = () => {
  const [volume, setVolume] = useState(INITIAL_VOLUME);
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeSliderDisplayed, setIsVolumeSliderDisplayed] = useState(false);

  useEffect(() => {
    setIsMuted(volume === 0);
  }, [volume]);

  const toggleMute = () => {
    setVolume(isMuted ? INITIAL_VOLUME : 0);
  };

  const showVolumeSlider = () => {
    setIsVolumeSliderDisplayed(true);
  };

  const hideVolumeSlider = () => {
    setIsVolumeSliderDisplayed(false);
  };

  const onVolumeChange = (value: number) => {
    setVolume(value);
  };
  return (
    <Wrapper onMouseOver={showVolumeSlider} onMouseOut={hideVolumeSlider}>
      <SoundIconWrapper onClick={toggleMute}>
        {isMuted ? <SoundOff /> : <SoundOn />}
      </SoundIconWrapper>
      <VolumeSliderWrapper isDisplayed={isVolumeSliderDisplayed}>
        <Slider value={volume} onChange={onVolumeChange} />
      </VolumeSliderWrapper>
    </Wrapper>
  );
};

export default VolumeControl;
