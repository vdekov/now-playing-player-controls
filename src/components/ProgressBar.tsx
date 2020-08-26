import React, { useState } from 'react';

import Slider from './Slider';

const addHeadingZero = (num) => (num > 9 ? num.toString() : `0${num}`);
const getDisplayTimeBySeconds = (seconds) => {
  if (!isFinite(seconds)) {
    return '00:00';
  }
  const min = addHeadingZero(Math.floor(seconds / 60));
  const sec = addHeadingZero(Math.floor(seconds % 60));
  return `${min}:${sec}`;
};

const ProgressBar = () => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const duration = 180;

  const onTooltipChange = (percent) => {
    setCurrentProgress(percent * duration);
  };
  return (
    <Slider
      tooltip
      tooltipValue={getDisplayTimeBySeconds(currentProgress)}
      onTooltipChange={onTooltipChange}
    />
  );
};

export default ProgressBar;
