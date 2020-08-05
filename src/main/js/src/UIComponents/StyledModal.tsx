import React from 'react';
import styled from 'styled-components';
import { RootDiv } from './UIComponents';

export const Modal = styled.div.attrs((props) => ({
  className: props.className,
}))`
  background: white;

  position: fixed;
  width: 50%;
  top: 50%;
  left: 50%;
  margin: -25% 0 0 -25%;

  opacity: 1;
  -webkit-filter: contrast(100%);

  pointer-events: none;
  border: solid 1px red;
`;

export const ModalBackground = styled(RootDiv)`
  -webkit-filter: blur(2px) grayscale(50%);

  -webkit-transform: scale(0.9);
`;
