import * as React from 'react';
import styled from 'styled-components';

// TODO: Look into how to enforce props for styled components
interface LabeledInputProps {
  className?: string,
  name: string,
  label: string,
  vertical?: null,
  horizontal?: null,
  [key: string]: any,
}

const LabeledInput = (props) => {
  return (
  <div className={props.className}>
    <label htmlFor={props.name}>{props.label}</label>
    <input type='text' ref={props.refToPass} />
  </div>
)};

export const StyledLabeledInput = styled(LabeledInput)<LabeledInputProps>`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
`;