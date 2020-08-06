import * as React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import questionSVG from "../assets/question.svg";
import FlexContainer from "./FlexContainer";

interface LabeledInputProps {
  className?: string;
  name: string;
  labelText: string;
  toolTipText?: string;
  vertical?;
  horizontal?;
  value?: string;
  [key: string]: any;
}

/**
 * A text input with label attached.
 * Pass an empty prop 'vertical' or 'horizontal' to determine whether the label will be
 * on top or to the left of the input.
 * @prop {String} name value to pass into 'name' attribute of input and 'for' attribute of label
 * @prop {String} labelText
 * @prop {String} toolTipText (optional) adds a tooltip to the label for further description
 */
const LabeledInput = (props: LabeledInputProps) => {
  const label = props.toolTipText ? (
    <LabelWithToolTip
      name={props.name}
      labelText={props.labelText}
      toolTipText={props.toolTipText}
    />
  ) : (
    <Label htmlFor={props.name}>{props.labelText}</Label>
  );
  return (
    <FlexContainer
      flexDirection="column"
      alignItems={props.alignItems || "flex-start"}
    >
      {label}
      <input
        type="text"
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
    </FlexContainer>
  );
};

const TooltipImage = styled.img`
  height: 1rem;
  width: auto;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  img {
    margin-left: 0.25rem;
  }
  margin-bottom: 0.25rem;
`;

const LabelWithToolTip = (props) => {
  return (
    <>
      <Label htmlFor={props.name}>
        {props.labelText}
        <TooltipImage
          src={questionSVG}
          alt="more information"
          data-tip
          data-for={props.name}
        />
      </Label>

      <ReactTooltip id={props.name} place="top" effect="solid">
        {props.toolTipText}
      </ReactTooltip>
    </>
  );
};

export default LabeledInput;
