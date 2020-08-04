import * as React from 'react';
import styled from 'styled-components';
import ReactTooltip from "react-tooltip";

interface LabeledInputProps {
  className?: string,
  name: string,
  labelText: string,
  toolTipText?: string,
  vertical?: null,
  horizontal?: null,
  [key: string]: any,
  value?: string
}

const LabelWithToolTip = (props) => {
  return (
    <>
      <label htmlFor={props.name}>
        {props.labelText} <span data-tip data-for={props.name}>⍰</span>
      </label>
      <ReactTooltip id={props.name} place="top" effect="solid">
        {props.toolTipText}
      </ReactTooltip>
    </>
  )
}

const LabeledInput = (props: LabeledInputProps) => {
  const label = props.toolTipText ?
    <LabelWithToolTip name={props.name} labelText={props.labelText} toolTipText={props.toolTipText}/> :
    <label htmlFor={props.name}>{props.labelText}</label>;
  return (
    <div className={props.className}>
      {label}
      <input type='text' name={props.name} onChange={props.onChange} value={props.value} />
    </div>
  )
};

/**
 * A text input with label attached.
 * Pass an empty prop 'vertical' or 'horizontal' to determine whether the label will be
 * on top or to the left of the input.
 * @prop {String} name value to pass into 'name' attribute of input and 'for' attribute of label
 * @prop {String} labelText
 * @prop {String} toolTipText (optional) adds a tooltip to the label for further description
 */
export const StyledLabeledInput = styled(LabeledInput)`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
`;