import * as React from "react";
import styled from "styled-components";
import { Button } from "./Buttons";
import Popup from "reactjs-popup";

interface GridTitleProps {
  className?: string,
  title: string,
  buttonText: string,
  handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  popup?: any
}

const OldGridTitle = (props: GridTitleProps) => {
  const button = props.popup ?
    <Popup trigger={<Button>{props.buttonText}</Button>} position="right center">
      {props.popup}
    </Popup> :
    <Button>{props.buttonText}</Button>
  return (
    <div className={props.className}>
      <GridTitle>{props.title}</GridTitle>
      {button}
    </div>
  )
}

/**
 * Outer container for the grid title section.
 * Horizontal flex container where items are vertically aligned
 * and have margins between them
 */
export const GridTitleContainer = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 0.5rem;
  }
`;

/**
 * Inline h3 element
 */
export const GridTitle = styled.h3<{children: string}>`
  display: inline-block;
`;