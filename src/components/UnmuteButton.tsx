import React from 'react';
import styled from 'styled-components';

import Device from '../utils';
import { SoundOff } from './Icons';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  outline: none;
  z-index: 1;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
`;
const Label = styled.span`
  margin-left: 4px;
  font-size: 14px;
  color: #fff;
`;

interface Props {
  muted?: boolean;
  onClick?: (event) => void;
}

const UnmuteButton: React.FC<Props> = ({
  muted = false,
  onClick = () => {}
}) => {
  if (!muted || !Device.isMobileDevice()) {
    // TODO: Add mobile device check
    return null;
  }
  return (
    <Wrapper role="button" tabIndex={0} onTouchEnd={onClick}>
      <Container>
        <SoundOff />
        <Label>Unmute</Label>
      </Container>
    </Wrapper>
  );
};

export default UnmuteButton;
