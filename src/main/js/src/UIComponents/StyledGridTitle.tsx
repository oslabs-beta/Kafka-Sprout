import * as React from "react";
import styled from "styled-components";
import { Button } from "./Buttons";

interface GridTitleProps {
  className?: string,
  title: string,
  buttonText: string,
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const GridTitle = (props: GridTitleProps) => {
  return (
    <div className={props.className}>
      <H3>{props.title}</H3>
      <Button onClick={props.handleClick}>{props.buttonText}</Button>
    </div>
  )
}

export const StyledGridTitle = styled(GridTitle)`
  display: flex;
  align-items: center;
`

const H3 = styled.h3`
  display: inline;
  margin-left: 0.5rem
`