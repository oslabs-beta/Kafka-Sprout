import React from "react";
import styled from "styled-components";
import constants from "./constants";
import Popup from 'reactjs-popup';

const crossBrowserTransition = (value: string) => `
  transition: ${value};
  -webkit-transition: ${value};
  -moz-transition: ${value};
`;

const BUTTON_TRANSITION = crossBrowserTransition("0.2s");

/**
 * Basic button with default grey-green background color and white text
 */
export const Button = styled.button`
  font-size: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 4px;
  color: #fff;
  background-color: ${constants.GREY_GREEN};
  border: solid 1px ${constants.GREY_GREEN};
  cursor: pointer;
  ${BUTTON_TRANSITION}
  &:active {
    transform: scale(0.9);
  }
  &:focus {
    outline: none;
  }
`;

/**
 * Button to start the cluster (has more padding)
 */
export const StartClusterButton = styled(Button)`
  background-color: ${constants.GREEN};
  border: solid 1px ${constants.GREEN};
  padding: 1rem;
`;

/**
 * Button with white background and grey-green text (and border)
 */
export const WhiteButton = styled(Button)`
  background-color: #fff;
  color: ${constants.GREY_GREEN};
`;

interface ButtonWithPopupProps {
  children: string,
  popup: React.ReactElement
}

/**
 * Button with Popup component attached
 * The children of ButtonWithPopup gets passed down into the Button, so it should be a String
 * @param popup The React element to show in the popup
 */
export const ButtonWithPopup = (props: ButtonWithPopupProps) => {
  return (
    <Popup trigger={<Button>{props.children}</Button>} position="right center">
      {props.popup}
    </Popup>
  )
}

/**
 * WhiteButton with Popup component attached
 * The children of ButtonWithPopup gets passed down into the Button, so it should be a String
 * @param popup The React element to show in the popup
 */
export const WhiteButtonWithPopup = (props: ButtonWithPopupProps) => {
  return (
    <Popup trigger={<WhiteButton>{props.children}</WhiteButton>} position="right center">
      {props.popup}
    </Popup>
  )
}
