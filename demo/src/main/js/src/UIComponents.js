import React from 'react';
import styled from 'styled-components';

const crossBrowserTransition = (value) => (`
  transition: ${value};
  -webkit-transition: ${value};
  -moz-transition: ${value};
`);

const MAIN_COLOR = '#0dad3b';
const BUTTON_TRANSITION = crossBrowserTransition('0.2s');

/**
 * 
 * styled-components allows for CSS-in-JS so that a separate CSS file
 * is not necessary to style HTML elements
 * It's good for creating component libraries and themes :^)
 * https://styled-components.com/
 * 
 */

export const RootDiv = styled.div.attrs(props => (
  // pass down props to actual HTML element attributes
  { className: props.className }
))`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  * {
    margin: 0.25rem 0;
  }
`;

export const Button = styled.button.attrs(props => props)`
  font-size: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  color: #fff;
  background-color: ${MAIN_COLOR};
  border: solid 1px ${MAIN_COLOR};
  cursor: pointer;
  ${BUTTON_TRANSITION}

  &:active {
    transform: scale(0.9);
  }
`;

const LabeledInput = (props) => (
  <div className={props.className}>
    <label htmlFor={props.name}>{props.label}</label>
    <input type='text' />
  </div>
);

export const StyledLabeledInput = styled(LabeledInput)`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
`;