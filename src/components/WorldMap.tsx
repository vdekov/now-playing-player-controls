import React from 'react';
import styled from 'styled-components';
import { Close } from './Icons';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d9e0e7;
`;
const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  cursor: pointer;
`;

interface Props {
  visible?: boolean;
  onClose?: (event) => void;
}

const WorldMap: React.FC<Props> = ({ visible = false, onClose = () => {} }) => {
  if (!visible) {
    return null;
  }
  return (
    <Wrapper>
      <CloseButtonWrapper onMouseDown={onClose} onTouchEnd={onClose}>
        <Close />
      </CloseButtonWrapper>
    </Wrapper>
  );
};

export default WorldMap;
