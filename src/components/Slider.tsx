import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function noop() {
  // empty line
}

const PROGRESS_HANDLE_SIZE = 12;

const Wrapper = styled.div`
  width: 100%;
  height: 8px;
  user-select: none;
`;
const SeekBar = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(17, 14, 57, 0.2);
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 8px;
  }

  &:before {
    top: -8px;
  }

  &:after {
    top: 8px;
  }
`;
const ProgressBar = styled.div`
  position: relative;
  top: 1px;
  left: 1px;
  height: 6px;
  width: 100px;
  background: #c0ccd8;
  border-radius: 4px;
`;
const ProgressHandle = styled.div`
  position: absolute;
  right: 0;
  width: ${PROGRESS_HANDLE_SIZE}px;
  height: ${PROGRESS_HANDLE_SIZE}px;
  margin-top: -3px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(31, 32, 33, 0.1);
  cursor: pointer;
`;
const Tooltip = styled.span`
  position: absolute;
  top: -26px;
  width: 40px;
  padding: 2px 0;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 2px 8px rgba(31, 32, 33, 0.3);
  color: #2d2867;
  font-size: 12px;
  font-weight: 500;
`;

const getIsTouchEvent = (event) => event.type.indexOf('touch') > -1;
const getIsMouseEvent = (event) => event.type.indexOf('mouse') > -1;
const getPosX = (event) => {
  let posX = 0;
  if (getIsTouchEvent(event)) {
    posX = event.touches[0].pageX;
  } else if (getIsMouseEvent(event)) {
    posX = event.pageX || event.clientX;
  }
  return posX;
};

interface Props {
  value?: number;
  onChange?: (value: number) => void;
  tooltip?: boolean;
  tooltipValue?: string;
  onTooltipChange?: (percent: string) => void;
}

interface TooltipProps {
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onMouseMove?: (event) => void;
}

const Slider = ({
  value = 0.33,
  onChange = noop,
  tooltip = false,
  tooltipValue,
  onTooltipChange = noop
}: Props) => {
  const [progress, setProgress] = useState(value);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const seekBarEl = useRef(null);

  let seekBarRect;

  useEffect(() => {
    setProgress(value);
  }, [value]);

  const onProgressChange = (nextProgess: number) => {
    // console.warn(nextProgess);
    setProgress(nextProgess);
    onChange(nextProgess);
  };

  const setSeekBarHandlerPosition = (event) => {
    const maxRelativePos = seekBarRect.width;
    let relativePos = getPosX(event) - seekBarRect.left;

    if (relativePos < 0) {
      relativePos = 0;
    } else if (relativePos > maxRelativePos) {
      relativePos = maxRelativePos;
    }
    // console.warn(relativePos / maxRelativePos);
    onProgressChange(relativePos / maxRelativePos);
    onSeekBarMouseMove(event);
  };

  const handleSeekBarMove = (event) => {
    event.stopPropagation();
    setSeekBarHandlerPosition(event);
  };

  const handleSeekBarMoveEnd = (event) => {
    event.stopPropagation();
    const isTouchEvent = getIsTouchEvent(event);
    window.removeEventListener(
      isTouchEvent ? 'touchmove' : 'mousemove',
      handleSeekBarMove
    );
    window.removeEventListener(
      isTouchEvent ? 'touchend' : 'mouseup',
      handleSeekBarMoveEnd
    );
    tooltip && setIsTooltipVisible(false);
  };

  const onSeekBarClick = (event) => {
    event.stopPropagation();
    // Update position
    seekBarRect = seekBarRect || seekBarEl.current.getBoundingClientRect();
    setSeekBarHandlerPosition(event.nativeEvent);
    // Attach touchmove/mousemove event
    const isTouchEvent = getIsTouchEvent(event);
    window.addEventListener(
      isTouchEvent ? 'touchmove' : 'mousemove',
      handleSeekBarMove
    );
    window.addEventListener(
      isTouchEvent ? 'touchend' : 'mouseup',
      handleSeekBarMoveEnd
    );
    // Make tooltip visible
    tooltip && setIsTooltipVisible(true);
  };

  // Tooltip related methods
  const onSeekBarMouseOver = () => {
    setIsTooltipVisible(true);
  };

  const onSeekBarMouseOut = () => {
    setIsTooltipVisible(false);
  };

  const onSeekBarMouseMove = (event) => {
    seekBarRect = seekBarRect || seekBarEl.current.getBoundingClientRect();
    const maxRelativePos = seekBarRect.width;
    let relativePos = getPosX(event) - seekBarRect.left;
    relativePos = Math.min(Math.max(0, relativePos), maxRelativePos);
    setTooltipPosition(relativePos);
    const percent = (relativePos / maxRelativePos).toFixed(2);
    onTooltipChange(percent);
  };

  const tooltipProps: TooltipProps = {};
  if (tooltip) {
    tooltipProps.onMouseOver = onSeekBarMouseOver;
    tooltipProps.onMouseOut = onSeekBarMouseOut;
    tooltipProps.onMouseMove = onSeekBarMouseMove;
  }

  return (
    <Wrapper>
      <SeekBar
        role="progressbar"
        tabIndex={0}
        ref={seekBarEl}
        onMouseDown={onSeekBarClick}
        onTouchStart={onSeekBarClick}
        {...tooltipProps}
      >
        <ProgressBar
          style={{
            width: `${progress * 100}%`
          }}
        >
          <ProgressHandle
            onMouseDown={onSeekBarClick}
            onTouchStart={onSeekBarClick}
            style={{
              right: `${PROGRESS_HANDLE_SIZE * (progress - 1)}px`
            }}
          />
        </ProgressBar>
        {tooltip && isTooltipVisible && (
          <Tooltip
            style={{
              left: `${tooltipPosition - 20}px`
            }}
          >
            {tooltipValue}
          </Tooltip>
        )}
      </SeekBar>
    </Wrapper>
  );
};

export default Slider;
