import * as React from "react";
import styled from "styled-components";
import { Button } from "./Buttons";
import Popup from "reactjs-popup";

interface GridTitleProps {
  className?: string,
  title: string,
  buttonText: string,
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  popup?: any
}

const GridTitle = (props: GridTitleProps) => {
  const button = props.popup ?
    <Popup trigger={<Button>{props.buttonText}</Button>} position="right center">
      {props.popup}
    </Popup> :
    <Button>{props.buttonText}</Button>
  return (
    <div className={props.className}>
      <H3>{props.title}</H3>
      {button}
    </div>
  )
}

export const StyledGridTitle = styled(GridTitle)`
  display: flex;
  align-items: center;
`

const H3 = styled.h3`
  display: inline-block;
  margin-right: 1rem
`