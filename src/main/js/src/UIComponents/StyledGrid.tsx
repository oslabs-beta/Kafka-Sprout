import * as React from "react";
import styled from "styled-components";
import constants from "./constants";

// <GridContainer columns={5} />
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    minmax(150px, 1fr)
  );
  border: 1px solid ${constants.DARKER_GREEN};
`;

interface RowProps {
  [key: string]: string[];
}

export const HeaderRow = (props: RowProps) => {
  const cells = props.headers.map((header) => (
    <HeaderCell>{header}</HeaderCell>
  ));
  return <>{cells}</>;
};

export const ContentRow = (props: RowProps) => {
  // console.log("styled grid", props.content);
  const cells = props.content.map((content) => <Cell>{content}</Cell>);
  return <>{cells}</>;
};

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: ${constants.GREY_GREEN};
  color: white;
`;

const HeaderCell = styled(Cell)`
  font-weight: 400;
  background-color: white;
  color: ${constants.DARKER_GREEN};
`;
